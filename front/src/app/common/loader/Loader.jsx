import React, { PureComponent } from "react";

import "./Loader.less";

export default class Loader extends PureComponent {
  render() {
    return (
      <div className="loader flex screen">
        <div className="cssload-container">
          <div className="cssload-tube-tunnel" />
        </div>
        <span className="text">Loading, please...</span>
      </div>
    );
  }
}
