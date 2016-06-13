import React from 'react';
import cx from 'classnames';

// Components
import BaseComponent from './BaseComponent';

import style from '../styles/ServerNotice.scss';

class ServerNotice extends BaseComponent {
  render() {
    const { error } = this.props;

    const ribbonClasses = cx(
      ['server-notice'],
      {'server-notice__hide': !error}
    );

    return <div className={ribbonClasses}>
      Error: FEC has a limit of 1000 requests / hr. Try again later.
    </div>;
  }
}

export default ServerNotice;
