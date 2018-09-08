import React, { PureComponent } from 'react';
import Input from '../common/input/Input';
import './ModalVote.less';
import * as api from '../api/api';

export default class ModalVote extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      flexComm: null,
      stake: null,
    };

    this.changeStake = this.changeStake.bind(this);
    this.submitStake = this.submitStake.bind(this);
  }

  changeStake(str) {
    this.setState({ stake: str });
  }

  submitStake(str) {
    api.getFlexComm(str)
      .then((flexComm) => {
        this.setState({ flexComm });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { flexComm } = this.state;
    const { item } = this.props;

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
          <p className="fix-comm">{`Fix commission: ${item !== null ? item.vote.fixedFee : '-'}`}</p>
          <p className="flex-comm">{`Flex commission: ${flexComm === null ? '-' : flexComm}`}</p>
        </div>

        <div className="v-stake-container flex">
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
        </div>

        <button className="submit btn">Commit vote</button>

      </div>
    );
  }
};