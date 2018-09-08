import React, { PureComponent } from 'react';
import AppStore from '../../store/AppStore';
import { getStage } from '../../helpers/utils';
import './Item.less';

export default class Item extends PureComponent {
  constructor(props) {
    super(props);

    this.openModalVote = this.openModalVote.bind(this);
  }

  openModalVote(id) {
    return () => { AppStore.vote(id) };
  }

  render() {
    const { item } = this.props;

    return (
      <section className="item">

        <div className="img"></div>

        <div className="main-info">
          <h2 className="title">{item.name}</h2>
          <p className="desctiption">Best kitties in Berlin</p>
        </div>

        <div className="info">

          <div className="active-voting flex-v">
            <span className="title t-medium">Active stage:</span>
            <span className="value">{getStage(item.vote.startTime, item.vote.commitTtl, item.vote.revealTtl)}</span>
            <span className="start-time">Start time: {new Date(item.vote.startTime * 1000).toString()}</span>
            <span className="time">left time 12:30:45</span>
            <span className="prize">Prize: {item.balance}</span>
          </div>

          <div className="moving flex-v">
            <div className="direction down">
              <svg viewBox="0 0 24 24">
                <path fill="#000000" d="M12,2L4.5,20.29L5.21,21L12,18L18.79,21L19.5,20.29L12,2Z" />
              </svg>
            </div>
            <span className="left-total">5/234</span>
            <span className="speed">34</span>
          </div>

        </div>

        <button className="vote btn" onClick={this.openModalVote(1)}>
          <svg className="vote-icon" viewBox="0 0 24 24">
            <path fill="#000000" d="M18,13L21,16V20C21,21.11 20.1,22 19,22H5C3.89,22 3,21.1 3,20V16L6,13H6.83L8.83,15H6.78L5,17H19L17.23,15H15.32L17.32,13H18M19,20V19H5V20H19M11.34,15L6.39,10.07C6,9.68 6,9.05 6.39,8.66L12.76,2.29C13.15,1.9 13.78,1.9 14.16,2.3L19.11,7.25C19.5,7.64 19.5,8.27 19.11,8.66L12.75,15C12.36,15.41 11.73,15.41 11.34,15M13.46,4.41L8.5,9.36L12.05,12.9L17,7.95L13.46,4.41Z" />
          </svg>
          Vote
          </button>

      </section>
    );
  }
};