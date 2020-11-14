import React, { FC } from 'react';
import cx from 'classnames';

import '../../styles/TitleComponent.scss';

export interface Props {
  className?: string;
}

export const Title: FC<Props> = ({ className, children }) => {
  const titleClasses = cx(['title-component', className]);
  return (
    <div className={titleClasses}>
      <div className="title-component__description">{children}</div>
    </div>
  );
};

export default Title;
