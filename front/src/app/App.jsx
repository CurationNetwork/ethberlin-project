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
  }

  render() {
    const items = AppStore.items;
    let content;

    console.log(items)

    if (items !== null) {
      content = <Loader />;
    } else {
      content = (
        <div className="list">
          <button className="add-item btn">Add item</button>
          <Item />
        </div>
      );
    }

    return (
      <main className="app screen">{content}</main >
    );
  }
}

export default hot(module)(App);
