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
  putItems(items) {
    this.items = items;
  }

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
