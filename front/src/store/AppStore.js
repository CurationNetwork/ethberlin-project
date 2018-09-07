import { observable, action } from "mobx";

export const screens = {
  MAIN: "main"
};

export class AppStore {
  @observable currentScreen;

  constructor() {
    this.currentScreen = screens.MAIN;
  }

  @action("set currentScreen")
  setCurrentScreen(currentScreen) {
    this.currentScreen = currentScreen;
  }
}

export default new AppStore();
