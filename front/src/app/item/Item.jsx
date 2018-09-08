import React, { PureComponent } from 'react';

import './Item.less';

export default class Item extends PureComponent {
  render() {
    return (
      <section className="item flex-v">
        <div className="img"></div>
        <div className="text">
          <p>Some text</p>
        </div>
      </section>
    );
  }
};