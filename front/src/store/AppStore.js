import { observable, action } from "mobx";

export const screens = {
  MAIN: "main"
};

export class AppStore {
  @observable currentScreen;
  @observable items;
  @observable voteId;

  constructor() {
    this.currentScreen = screens.MAIN;
    this.items = null;
    this.voteId = null;
  }

  @action("set currentScreen")
  setCurrentScreen(currentScreen) {
    this.currentScreen = currentScreen;
  }

  @action("put itemData")
  putItems(itemObject) {
    if (!this.items) {
      this.items = [];
    }
    const index = this.items.findIndex((item) => item.id === itemObject.id);

    if (index !== -1) {
      this.items[index] = { ...this.items[index], ...itemObject }
    } else {
      this.items.push(itemObject)
    }

  };

  @action("open modal vote")
  vote(voteId) {
    this.voteId = voteId;
  }

  @action("close modal vote")
  closeModalVote() {
    this.voteId = null;
  }
}

export default new AppStore();
