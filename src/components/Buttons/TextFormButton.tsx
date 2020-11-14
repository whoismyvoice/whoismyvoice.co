import React, { FC, useMemo } from 'react';
import cx from 'classnames';
import { Props } from './TextButton';

export const TextFormButton: FC<Omit<Props, 'link'>> = (props) => {
  const { onClick = () => void 0, text } = props;
  const buttonClasses = useMemo(
    () => cx('text-button', { 'text-button--back': text === 'Back' }),
    [text]
  );
  return (
    <button type="submit" className={buttonClasses} onClick={onClick}>
      {text}
      <span className="text-button-border" />
    </button>
  );
};

export default TextFormButton;
