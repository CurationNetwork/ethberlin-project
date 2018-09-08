import classNames from 'classnames';
import * as React from 'react';
import InlineSVG from 'svg-inline-react';

import './Input.less';


export default class Input extends React.PureComponent {
  ref;

  constructor(props) {
    super(props);

    this.state = {
      value: '',
      stateInput: 'normal',
      autofocus: false,
    };

    this.onKeyPress = this.onKeyPress.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onKeyPress(event) {
    const { onValidate = null, onSubmit } = this.props;
    const { value } = this.state;

    if (event.charCode === 13) {
      if (onValidate != null) {
        if (onValidate(value)) {
          onSubmit(value);
          this.setState({ stateInput: 'ok' });
        } else {
          this.setState({ stateInput: 'error' });
        }
      } else {
        onSubmit(value);
        this.setState({ stateInput: 'ok' });
      }

      this.ref.blur();
    }
  }

  onChange(event) {
    const { stateInput } = this.state;
    const { onChange = null } = this.props;

    const newState = {
      value: event.target.value,
    };

    if (stateInput === 'error' || stateInput === 'ok') {
      newState['stateInput'] = 'normal';
    }

    if (onChange != null) {
      onChange(event.target.value);
    }

    this.setState(newState);
  }

  componentDidMount() {
    const { autofocus = false } = this.props;

    if (autofocus) {
      this.setState({ autofocus: true });
    }
  }


  render() {
    const { value, stateInput, autofocus } = this.state;
    const { className = null, placeholder = '', disabled } = this.props;

    return (
      <div className="component-input-container">
        <input
          onKeyPress={this.onKeyPress}
          onChange={this.onChange}
          value={value}
          className={classNames('component-input', className, {
            error: stateInput === 'error',
          })}
          ref={(r) => this.ref = r}
          autoFocus={autofocus}
          disabled={disabled}
          placeholder={placeholder}
        />
        <InlineSVG
          className={classNames('component-input-icon', {
            ok: stateInput === 'ok',
          })}
          src={require('../../../assets/img/input-done.svg')}
        />
      </div>
    );
  }
}
