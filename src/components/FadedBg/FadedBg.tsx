import React, { VFC } from 'react';
import cx from 'classnames';

interface Props {
  color?: string;
  didScroll?: boolean;
}

export const FadedBg: VFC<Props> = (props) => {
  const { color = 'white', didScroll = false } = props;
  const fadedClasses = cx(['faded-bg'], {
    'faded-white': color === 'white',
    hide: !didScroll,
  });
  return <div className={fadedClasses} />;
};

export default FadedBg;
