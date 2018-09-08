import React, { Component } from "react";
import { hot } from "react-hot-loader";

import { observer } from "mobx-react";
import AppStore from "../store/AppStore";
import Loader from './common/loader/Loader';
import Item from './item/Item';

import "./App.less";

@observer
class App extends Component {
  componentDidMount() {
    //TODO: get itemData
    setTimeout(() => AppStore.putItems([]), 2000);
  }

  render() {
    const items = AppStore.items;
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

            <button className="add-item btn">Add item</button>

          </header>

          <div className="list">
            <Item />
          </div>

        </div>
      );
    }

    return (
      <main className="app screen">{content}</main >
    );
  }
}

export default hot(module)(App);
