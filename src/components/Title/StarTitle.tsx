import React, { FC } from 'react';

import '../../styles/TitleComponent.scss';

const Stars: FC<unknown> = () => (
  <div className="three-stars">
    <span>&#9733;</span>
    <span>&#9733;</span>
    <span>&#9733;</span>
  </div>
);

export const StarTitle: FC<unknown> = ({ children }) => (
  <div className="title-component uppercase">
    <Stars />
    <div className="title-component__description">{children}</div>
  </div>
);

export default StarTitle;
