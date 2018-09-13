import React, { PureComponent } from 'react';
import AppStore from '../../store/AppStore';
import { getStage, getDataFromSec, getTimeLeft, calcSpeed } from '../../helpers/utils';
import moment from 'moment';
import classNames from 'classnames';
import { toJS } from 'mobx';
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
    const movings = toJS(item).moving;
    const isVoting = item.votingId !== '0';
    const stage = isVoting ? getStage(item.vote.startTime, item.vote.commitTtl, item.vote.revealTtl) : 'none';
    const timeLeft = isVoting ? getTimeLeft(item.vote.startTime, item.vote.commitTtl, item.vote.revealTtl) : 0;
    const speed = (movings && movings.length) ? calcSpeed(movings) : 0;

    return (
      <section className="item">
        <div className="item-wrapper">
          <div className="img">
            <img className="img" src={require(`../../assets/pic/${item.id}.png`)} alt="" />
          </div>

          <div className="main-info">
            <h2 className="title">{item.name}</h2>
            <p className="desctiption">{item.description}</p>
            <p className={classNames(
              'weight', { up: speed > 0 }, { down: speed < 0 }
            )}>Rank: <b>{item.rank}</b></p>
          </div>

          <div className="info flex-v">

            <div className="info-fields flex">
              {isVoting &&
                <div>
                  <p className="active-state">
                    <span className="active-state-title t-medium">Voting</span>
                    <span className={`active-state-value t-medium ${stage}`}>{stage} stage</span>
                    <span className="left-time-title t-medium">, {timeLeft} left</span>
                  </p>
                </div>
              }
            </div>

            <div className="info-fields flex">
              {item.balance !== 0 &&
                <p className="prize">
                  <span className="prize-title t-medium">Bounty:</span>
                  <span className="prize-value t-medium">{item.balance} CRN</span>
                </p>
              }
            </div>

            <div className="info-fields flex">
              {speed !== 0 &&
                <div className="moving flex-v">
                  <p className="speed">
                    <span className="speed t-medium">
                      Moving
                  {(speed < 0 && <span className="down"> &darr; </span>)}
                      {(speed > 0 && <span className="up"> &uarr; </span>)}
                      at {speed} CRN/sec
                </span>
                  </p>
                </div>
              }
            </div>
          </div>

        </div>
        {stage === 'commit' || stage === 'none'
          ?
          <button className="vote btn" onClick={this.openModalVote(item.id)}>
            <svg className="vote-icon" viewBox="0 0 24 24">
              <path fill="#000000" d="M18,13L21,16V20C21,21.11 20.1,22 19,22H5C3.89,22 3,21.1 3,20V16L6,13H6.83L8.83,15H6.78L5,17H19L17.23,15H15.32L17.32,13H18M19,20V19H5V20H19M11.34,15L6.39,10.07C6,9.68 6,9.05 6.39,8.66L12.76,2.29C13.15,1.9 13.78,1.9 14.16,2.3L19.11,7.25C19.5,7.64 19.5,8.27 19.11,8.66L12.75,15C12.36,15.41 11.73,15.41 11.34,15M13.46,4.41L8.5,9.36L12.05,12.9L17,7.95L13.46,4.41Z" />
            </svg>
            Vote
          </button>
          : <button className="rev btn" onClick={this.openModalVote(item.id)}>
            Reveal
          </button>
        }

      </section>
    );
  }
};
