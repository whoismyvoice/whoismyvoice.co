import * as React from 'react';
import * as cx from 'classnames';

import '../../styles/CornerRibbon.css';

interface Props {
  didSearch?: boolean;
}

class CornerRibbon extends React.Component<Props> {
  render() {
    const { didSearch } = this.props;

    const ribbonClasses = cx(['corner-ribbon'], {
      'corner-ribbon__hide': didSearch,
    });
    return (
      <div className={ribbonClasses}>
        <a
          href="http://health.whoismyvoice.com/"
          target="_blank"
          rel="noreferrer noopener"
        >
          Care about healthcare?
        </a>
      </div>
    );
  }
}

export default CornerRibbon;