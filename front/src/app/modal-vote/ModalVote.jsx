import React, { PureComponent } from 'react';
import Input from '../common/input/Input';
import './ModalVote.less';
import classNames from 'classnames';
import * as api from '../api/api';

export default class ModalVote extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      flexComm: null,
      stake: null,
      item: this.props.item,
      direction: 'up',
    };

    this.changeStake = this.changeStake.bind(this);
    this.submitStake = this.submitStake.bind(this);
    this.selectDirection = this.selectDirection.bind(this);
  }

  changeStake(str) {
    this.setState({ stake: str });
  }

  submitStake(stake) {
    api.getFlexComm(stake)
      .then((flexComm) => {
        this.setState({ flexComm });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  selectDirection(direction) {
    return () => this.setState({ direction });
  }

  render() {
    const { flexComm, item, direction } = this.state;

    return (
      <div className="modal-vote">
        <h2 className="title">Voting</h2>

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
          <p className="fix-comm">{`Fix commission: ${item.vote.fixedFee}`}</p>
          <p className="flex-comm">{`Flex commission: ${flexComm === null ? '-' : flexComm}`}</p>
        </div>

        {/* <div className="v-stake-container flex">
          <section>
            <p className="caption t-medium">Voting stake:</p>
            <Input
              className="input-voiting-stake"
              disabled={true}
            />
          </section>
          <span className="equal">=</span>
          <section>
            <p className="caption t-medium">Voters sum.:</p>
            <Input
              className="input-voiting-stake"
              disabled={true}
            />
          </section>
          <span className="plus">+</span>
          <section>
            <p className="caption t-medium">Prize:</p>
            <Input
              className="input-voiting-stake"
              disabled={true}
            />
          </section>
        </div> */}

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

        <button className="submit btn">Commit vote</button>

      </div>
    );
  }
};