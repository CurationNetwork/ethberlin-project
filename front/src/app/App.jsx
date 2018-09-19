import React, { Component } from "react";
import { hot } from "react-hot-loader";

import { observer } from "mobx-react";
import AppStore from "../store/AppStore";
import Loader from './common/loader/Loader';
import Item from './item/Item';
import ModalContainer from './common/modal/ModalContainer';
import ModalVote from './modal-vote/ModalVote';
import ModalAddItem from './modal-add-item/ModalAddItem';
import * as api from './api/api';
import { prepareFromArr } from '../helpers/utils';
import { currentAccount } from '../helpers/eth';
import { address, votingAddress, tokenAddress } from '../constants/constants.js';
import "./App.less";

@observer
class App extends Component {
  constructor(props) {
    super(props);

    this.faucet = this.faucet.bind(this);
  }

  componentDidMount() {
    AppStore.putItems();

    setInterval(() => {
      currentAccount().then(acc => {
        AppStore.setAccount(acc);

        api.getBalance(acc).then(balance => {
          AppStore.setBalance(balance.toString());
        })
      });
    }, 1000);
  }

  faucet() {
    api.faucet()
      .then(() => alert('faucet OK'))
      .catch(e => console.log(e));
  }

  render() {
    const items = AppStore.items;
    const balance = AppStore.currentBalance || "";
    const account = AppStore.currentAccount || "";
    const durationAnimation = 200;
    let content;

    if (items === null) {
      content = <Loader />;
    } else {
      content = (
        <div className="main-container">

          <header className="header flex-v">
            <div className="logo">
              <p className="cur">curation.</p>
              <p className="net">network</p>
            </div>
            <div className="balance">
              <p className="address">{account.slice(0, 5) + '...' + account.slice(-5, account.length)}</p>
              <p>
                <span className="tokens">{balance}</span>
                <span className="sym">CRN</span>
              </p>
              <button className="faucet-bnt btn" onClick={() => this.faucet()}>
                <span className="faucet-text">Faucet</span>
              </button>
            </div>
            {/* <div className="overlay" /> */}
          </header>

          <div className="list">
            <div className="top-bar flex-v">
              <h1 className="title-main">Token Curated Ranking</h1>
              <button className="add-item btn" onClick={() => AppStore.addNewItem()}>
                <span className="plus">+</span>
                <span className="add">Add item</span>
              </button>
            </div>
            {items.map((item, i) => <Item key={i} item={item} />)}
          </div>

        </div>
      );
    }

    return (
      <main className="app screen" id="app">
        {content}
        <ModalContainer
          isOpen={AppStore.voteId !== null}
          classNameWindow="dashboard-modal"
          onClose={() => AppStore.closeModalVote()}
          animationWindow={{
            duration: durationAnimation,
            styleStart: {
              opacity: 0,
              transform: 'scale(.95,.95)',
            },
            styleEnd: {
              opacity: 1,
              transform: 'scale(1,1)',
            },
          }}
          animationBackdrop={{
            duration: durationAnimation,
            styleStart: { opacity: 0 },
            styleEnd: { opacity: 1 },
          }}
          blur={{
            block: 'app',
            duration: durationAnimation,
            size: 3,
          }}
        >
          <ModalVote item={AppStore.items !== null ? AppStore.items.find((item) => item.id === AppStore.voteId) : null} />
        </ModalContainer>
        <ModalContainer
          isOpen={AppStore.isAddNewItem !== null}
          classNameWindow="dashboard-modal"
          onClose={() => AppStore.closeModalAddNewItem()}
          animationWindow={{
            duration: durationAnimation,
            styleStart: {
              opacity: 0,
              transform: 'scale(.95,.95)',
            },
            styleEnd: {
              opacity: 1,
              transform: 'scale(1,1)',
            },
          }}
          animationBackdrop={{
            duration: durationAnimation,
            styleStart: { opacity: 0 },
            styleEnd: { opacity: 1 },
          }}
          blur={{
            block: 'app',
            duration: durationAnimation,
            size: 3,
          }}
        >
          <ModalAddItem />
        </ModalContainer>
      </main >
    );
  }
}

export default hot(module)(App);
