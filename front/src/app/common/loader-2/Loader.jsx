import * as React from 'react';
import InlineSVG from 'svg-inline-react';

import './Loader.less';

class Loader extends React.Component {
  render() {
    const { text = null, className = '', size = 40 } = this.props;

    return (
      <div className={`spinner flex ${className}`}>
        <InlineSVG
          style={{ width: `${size}px`, height: `${size}px` }}
          src={require('../../../assets/img/loader.svg')}
        />
        {text !== null && <p className="support-block__paragraph">{text}</p>}
      </div>
    );
  }
}

export default Loader;
