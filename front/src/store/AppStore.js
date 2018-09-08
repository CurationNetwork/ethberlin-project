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
  putItems(voteId) {
    this.voteId = voteId;
  }
}

export default new AppStore();
