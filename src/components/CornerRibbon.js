import React from 'react';
import cx from 'classnames';

// Components
import BaseComponent from './BaseComponent';

import style from '../styles/CornerRibbon.scss';

class CornerRibbon extends BaseComponent {
  render() {
    const {did_search} = this.props;

    const ribbonClasses = cx(
      ['corner-ribbon'],
      {'corner-ribbon__hide': did_search}
    );
    return <div className={ribbonClasses}>
      <a
        href="http://health.whoismyvoice.com/"
        target="_blank"
      >
        Care about healthcare?
      </a>
    </div>;
  }
}

export default CornerRibbon;
