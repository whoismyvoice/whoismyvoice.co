import React from 'react';
import cx from 'classnames';

interface Props {
  color?: string;
  didScroll?: boolean;
}

class FadedBG extends React.Component<Props> {
  static defaultProps = {
    color: 'white',
  };

  render(): JSX.Element {
    const fadedClasses = cx(['faded-bg'], {
      'faded-white': this.props.color === 'white',
      hide: !this.props.didScroll,
    });
    return <div className={fadedClasses} />;
  }
}

export default FadedBG;
