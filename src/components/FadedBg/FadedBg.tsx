import * as React from 'react';
import * as cx from 'classnames';

interface Props {
  color?: string;
  didScroll?: boolean;
}

class FadedBG extends React.Component<Props> {
  static defaultProps = {
    color: 'white',
  };

  render() {
    const fadedClasses = cx(['faded-bg'], {
      'faded-white': this.props.color === 'white',
      hide: !this.props.didScroll,
    });
    return <div className={fadedClasses} />;
  }
}

export default FadedBG;
