import React, { FC, useMemo } from 'react';
import cx from 'classnames';

// Styles
import '../../styles/TextButton.scss';

export interface Props {
  link?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  text: string;
}

export const TextButton: FC<Props> = (props) => {
  const { onClick = () => void 0, link, text } = props;
  const buttonClasses = useMemo(
    () => cx('text-button', { 'text-button--back': text === 'Back' }),
    [text]
  );
  return (
    <a href={link} className={buttonClasses} onClick={onClick}>
      {text}
      <span className="text-button-border" />
    </a>
  );
};

export default TextButton;
