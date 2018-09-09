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
import "./App.less";

@observer
class App extends Component {
  componentDidMount() {
    setTimeout(() =>
      api.getItemIds()
        .then((ids) => {
          if (Array.isArray(ids) && ids.length > 0) {
            ids.map((id) => id.toString()).forEach(id => {
              api.getItem(id)
                .then((item) => {
                  item = { ...prepareFromArr(item, 'item'), id };
                  if (item.votingId !== '0') {
                    api.getVoting(item.votingId)
                      .then((vote) => {
                        vote = prepareFromArr(vote, 'voting');

                        const ids = [];
                        const promises = [];

                        item.movingsIds.forEach(movId => {
                          ids.push(movId);
                          promises.push(api.getMoving(movId));
                        });

                        Promise.all(promises)
                          .then((moving) => {
                            moving = moving.map((mov) => prepareFromArr(mov, 'mov'))

                            AppStore.putItems({ ...item, id, vote, moving });
                          })
                          .catch((error) => {
                            console.error(error);
                          });
                      })
                      .catch((error) => {
                        console.error(error);
                      });
                  } else {
                    const ids = [];
                    const promises = [];

                    item.movingsIds.forEach(movId => {
                      ids.push(movId);
                      promises.push(api.getMoving(movId));
                    });

                    Promise.all(promises)
                      .then((moving) => {
                        moving = moving.map((mov) => prepareFromArr(mov, 'mov'))

                        AppStore.putItems({ ...item, id, moving });
                      })
                      .catch((error) => {
                        console.error(error);
                      });
                  }
                })
                .catch((error) => {
                  console.error(error);
                });
            });
          } else {
            AppStore.putItems();
          }
        })
        .catch((error) => {
          console.error(error);
        })
      , 2000);
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
