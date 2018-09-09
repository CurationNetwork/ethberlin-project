import { observable, action } from "mobx";

export const screens = {
  MAIN: "main"
};

export class AppStore {
  @observable currentScreen;
  @observable items;
  @observable voteId;
  @observable isAddNewItem;

  constructor() {
    this.currentScreen = screens.MAIN;
    this.items = null;
    this.voteId = null;
    this.isAddNewItem = null;
  }

  @action("set currentScreen")
  setCurrentScreen(currentScreen) {
    this.currentScreen = currentScreen;
  }

  @action("put itemData")
  putItems(itemObject = []) {
    if (!this.items) {
      this.items = [];
    }

    const index = this.items.findIndex((item) => item.id === itemObject.id);

    if (index !== -1) {
      this.items[index] = { ...this.items[index], ...itemObject }
    } else {
      if (itemObject.length === 0) {
        this.items = [];
      } else {
        this.items.push(itemObject)
      }
    }
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
}

export default new AppStore();
