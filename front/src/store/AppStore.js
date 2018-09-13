import { observable, action } from "mobx";
import * as api from '../app/api/api';
import { prepareFromArr } from '../helpers/utils';

export const screens = {
  MAIN: "main"
};

export class AppStore {
  @observable currentScreen;
  @observable items;
  @observable voteId;
  @observable isAddNewItem;
  @observable currentBalance;
  @observable currentAccount;

  constructor() {
    this.currentScreen = screens.MAIN;
    this.items = null;
    this.voteId = null;
    this.isAddNewItem = null;
    this.currentBalance = null;
  }

  @action("set currentScreen")
  setCurrentScreen(currentScreen) {
    this.currentScreen = currentScreen;
  }

  @action("put itemData")
  putItems(itemObject = []) {
    api.getItemIds()
      .then((ids) => {
        if (Array.isArray(ids) && ids.length > 0) {
          ids.map((id) => id.toString()).forEach(id => {
            api.getItem(id)
              .then((item) => {
                item = { ...prepareFromArr(item, 'item'), id };

                api.getCurrentRank(item.id)
                  .then(rank => {
                    item.rank = rank.toString();

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
                              const itemObject = { ...item, id, vote, moving };

                              if (!this.items) {
                                this.items = [];
                              }

                              const index = this.items.findIndex((item) => item.id === id);

                              if (index !== -1) {
                                this.items[index] = { ...this.items[index], ...itemObject }
                              } else {
                                if (itemObject.length === 0) {
                                  this.items = [];
                                } else {
                                  this.items.push(itemObject)
                                }
                              }
                              // AppStore.putItems({ ...item, id, vote, moving });
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

                          const itemObject = { ...item, id, moving };

                          if (!this.items) {
                            this.items = [];
                          }

                          const index = this.items.findIndex((item) => item.id === id);

                          if (index !== -1) {
                            this.items[index] = { ...this.items[index], ...itemObject }
                          } else {
                            if (itemObject.length === 0) {
                              this.items = [];
                            } else {
                              this.items.push(itemObject)
                            }
                          }
                        })
                        .catch((error) => {
                          console.error(error);
                        });
                    }
                 });
              })
              .catch((error) => {
                console.error(error);
              });
          });
        } else {

          const itemObject = [];

          if (!this.items) {
            this.items = [];
          }

          const index = this.items.findIndex((item) => item.id === id);

          if (index !== -1) {
            this.items[index] = { ...this.items[index], ...itemObject }
          } else {
            if (itemObject.length === 0) {
              this.items = [];
            } else {
              this.items.push(itemObject)
            }
          }
        }
      })
      .catch((error) => {
        console.error(error);
      })
  };

  @action("open modal vote")
  vote(voteId) {
    this.voteId = voteId;
  }

  @action("open modal add new item")
  addNewItem() {
    this.isAddNewItem = true;
  }

  @action("close modal add new item")
  closeModalAddNewItem() {
    this.isAddNewItem = null;
  }

  @action("close modal vote")
  closeModalVote() {
    this.voteId = null;
  }

  @action("set balance")
  setBalance(balance) {
    this.currentBalance = balance;
  }

  @action("set account")
  setAccount(account) {
    this.currentAccount = account;
  }
}

export default new AppStore();
