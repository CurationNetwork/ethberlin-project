import React, { PureComponent } from 'react';
import Input from '../common/input/Input';
import './ModalAddItem.less';

export default class ModalAddItem extends PureComponent {
  render() {
    return (
      <div className="modal-add-item">
        <h2 className="title">Add new Item</h2>

        <p className="caption t-medium">Name:</p>
        <Input
          className="custom-input"
          autofocus={true}
          onValidate={(str) => /^\d+$/.test(str)}
          onChange={this.changeStake}
          onSubmit={this.submitStake}
        />

        <p className="caption t-medium">Description:</p>
        <Input
          className="custom-input"
          autofocus={false}
          onValidate={(str) => /^\d+$/.test(str)}
          onChange={this.changeStake}
          onSubmit={this.submitStake}
        />

        <button className="add-item btn">Add</button>
      </div>
    );
  }
};