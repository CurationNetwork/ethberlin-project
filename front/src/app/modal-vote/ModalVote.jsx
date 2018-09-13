import React, { PureComponent } from 'react';
import Input from '../common/input/Input';
import { toJS } from 'mobx';
import './ModalVote.less';
import classNames from 'classnames';
import { waitTransaction } from '../../helpers/eth';
import { getStage } from '../../helpers/utils';
import AppStore from '../../store/AppStore';
import Loader from '../common/loader-2/Loader';
import * as api from '../api/api';

export default class ModalVote extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      flexComm: null,
      fixCom: null,
      stake: null,
      item: this.props.item,
      direction: 'up',
      isLoader: false,
    };

    this.changeStake = this.changeStake.bind(this);
    this.submitStake = this.submitStake.bind(this);
    this.selectDirection = this.selectDirection.bind(this);
    this.sendTrans = this.sendTrans.bind(this);
    this.voteReveal = this.voteReveal.bind(this);
    this.voteFinish = this.voteFinish.bind(this);
  }

  changeStake(str) {
    this.setState({ stake: str });
  }

  submitStake(stake) {
    api.getFlexComm(stake)
      .then((flexComm) => {
        this.setState({ flexComm: flexComm.toString() });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  selectDirection(direction) {
    return () => this.setState({ direction });
  }

  componentDidMount() {
    const { item } = this.props;
    const isVoting = item.votingId !== '0';

    if (!isVoting) {
      api.getFixComm(item.id)
        .then((result) => {
          this.setState({ fixCom: result.toString() });
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      this.setState({ fixCom: item.vote.fixedFee });
    }

  }

  sendTrans() {
    const { direction, stake, flexComm, fixCom } = this.state;
    const biDir = direction === 'up' ? 1 : 0;


    api.getCommit(biDir, stake)
      .then((result) => {
        api.commitVote(this.props.item.id, result)
          .then((res) => {
            localStorage.setItem(`vote_data_${this.props.item.id}`,
              JSON.stringify({ flexComm, fixCom, stake, direction }));
            this.setState({ isLoader: true });

            waitTransaction(res)
              .then((result) => {
                AppStore.closeModalVote();
                AppStore.putItems();

              })
              .catch((error) => {
                console.error(error);
              });

          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  voteFinish() {
    const { item } = this.props;

    console.log(item)

    api.voteFinish(item.id)
      .then((result) => {
        this.setState({ isLoader: true });

        waitTransaction(result)
          .then((result) => {
            AppStore.closeModalVote();
            AppStore.putItems();
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  voteReveal() {
    const { item } = this.props;

    let data = localStorage.getItem(`vote_data_${item.id}`);

    if (data !== null) {
      try {
        data = JSON.parse(data);
      } catch (error) {
        console.error(error);
      }
    }

    api.voteReveal(item.id, data.direction === 'up' ? 1 : 0, data.stake)
      .then((result) => {
        this.setState({ isLoader: true });

        waitTransaction(result)
          .then((result) => {
            AppStore.closeModalVote();
            AppStore.putItems();

          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }


  render() {
    const { flexComm, direction, fixCom, item, isLoader } = this.state;

    let content;
    let btn;
    const isVoting = item.votingId !== '0';

    if (!isVoting || getStage(item.vote.startTime, item.vote.commitTtl, item.vote.revealTtl) === 'commit') {
      content = (
        <div>
          <div className="input-wrapper">
            <p className="caption t-medium">Stake:</p>
            <Input
              className="custom-input"
              autofocus={true}
              onValidate={(str) => /^\d+$/.test(str)}
              onChange={this.changeStake}
              onSubmit={this.submitStake}
            />
          </div>
          <div className="commission-container flex">
            <p className="fix-comm">{`Fix commission: ${fixCom}`}</p>
            <p className="flex-comm">{`Flex commission: ${flexComm === null ? '-' : flexComm}`}</p>
          </div>

          <div className="switch flex">
            <section
              onClick={this.selectDirection('up')}
              className={classNames("up flex", { active: direction === 'up' })}
            >
              <svg className="up-icon" viewBox="0 0 24 24">
                <path fill="#000000" d="M7,10L12,15L17,10H7Z" />
              </svg>
              Up</section>
            <section
              onClick={this.selectDirection('down')}
              className={classNames("down flex", { active: direction === 'down' })}
            >
              <svg className="down-icon" viewBox="0 0 24 24">
                <path fill="#000000" d="M7,10L12,15L17,10H7Z" />
              </svg>
              Down</section>
          </div>
        </div>
      );

      btn = (
        <button className="submit btn" onClick={this.sendTrans}>Commit vote</button>
      );
    } else if (getStage(item.vote.startTime, item.vote.commitTtl, item.vote.revealTtl) === 'reveal') {
      let data = localStorage.getItem(`vote_data_${item.id}`);

      if (data !== null) {
        try {
          data = JSON.parse(data);
        } catch (error) {
          console.error(error);
        }
      }

      content = (
        <div className="old-info">
          <p className="stake">{`Stake: ${data.stake}`}</p>
          <p className="commission">{`Commission: ${data.fixCom} + ${data.flexComm}`}</p>
          <p className="direction">{`Direction: ${data.direction}`}</p>
        </div>
      );

      btn = (
        <button className="submit btn" onClick={this.voteReveal}>Reveal</button>
      );
    } else {
       btn = (
        <button className="submit btn" onClick={this.voteFinish}>Finish</button>
      );
    }
    /*else if (getStage(item.vote.startTime, item.vote.commitTtl, item.vote.revealTtl) === 'none') {
      content = (
        <div>
          <p>You commited already!</p>
        </div>
      );
    } else {
      content = (
        <div>
          <p>Vote is finished!</p>
        </div>
      );
    }
*/

    return (
      <div className="modal-vote">
        {isLoader &&
          <div className="overlay flex">
            <Loader size={80} />
          </div>
        }
        <h2 className="title">Voting</h2>
        {content}
        {btn}
      </div>
    );
  }
};
