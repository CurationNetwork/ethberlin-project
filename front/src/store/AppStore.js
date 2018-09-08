import { observable, action } from "mobx";

export const screens = {
  MAIN: "main"
};

export class AppStore {
  @observable currentScreen;
  @observable items;

  constructor() {
    this.currentScreen = screens.MAIN;
    // this.items = [{

    // }]
    this.items = null;
  }

  @action("set currentScreen")
  setCurrentScreen(currentScreen) {
    this.currentScreen = currentScreen;
  }

  @action("put itemData")
  setCurrentScreen(items) {
    this.items = items;
  }
}

export default new AppStore();
