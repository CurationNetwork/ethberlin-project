import React, { Component } from "react";
import { hot } from "react-hot-loader";

import { observer } from "mobx-react";
import AppStore from "../store/AppStore";
import Loader from './common/loader/Loader';
import Item from './item/Item';
import ModalContainer from './common/modal/ModalContainer';
import ModalVote from './modal-vote/ModalVote';
import * as api from './api/api';
import "./App.less";

@observer
class App extends Component {
  componentDidMount() {
    setTimeout(() =>
      api.getItemIds()
        .then((ids) => {
          if (Array.isArray(ids) && ids.length > 0) {
            ids.forEach(id => {
              api.getItem(id)
                .then((item) => {
                  if (item.votingId !== 0) {
                    api.getVoting(id)
                      .then((vote) => {
                        console.log({ ...item, id, vote })
                        AppStore.putItems({ ...item, id, vote });
                      })
                      .catch((error) => {
                        console.error(error);
                      });
                  } else {
                    AppStore.putItems({ ...item, id });
                  }
                })
                .catch((error) => {
                  console.error(error);
                });
            });
          }
        })
        .catch((error) => {
          console.error(error);
        })
      , 0);
  }

  render() {
    const items = AppStore.items;
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
            {/* <div className="overlay" /> */}
          </header>

          <div className="list">
            <button className="add-item btn">
              <span className="plus">+</span>
              <span className="add">Add item</span>
            </button>
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
          //TODO: correct animation
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
          <ModalVote />
        </ModalContainer>
      </main >
    );
  }
}

export default hot(module)(App);
