import React, { PureComponent } from 'react';
import Input from '../common/input/Input';
import './ModalVote.less';

export default class ModalVote extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      fixComm: null,
      flexComm: null,
      stake: null,
    };

    this.changeStake = this.changeStake.bind(this);
  }

  changeStake(str) {
    this.setState({ stake: str });
  }

  submitStake(str) {
    getData
      .then((response) => {
        code
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { fixComm, flexComm } = this.state;

    return (
      <div className="modal-vote">
        <h2 className="title">Voting</h2>

        <div className="input-wrapper">
          <p className="caption t-medium">Stake:</p>
          <Input
            className="custom-input"
            autofocus={true}
            onChange={this.changeStake}
          // onSubmit={}
          />
        </div>
        <div className="commission-container flex">
          <p className="fix-comm">{`Fix commission: ${fixComm === null ? '-' : fixComm}`}</p>
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