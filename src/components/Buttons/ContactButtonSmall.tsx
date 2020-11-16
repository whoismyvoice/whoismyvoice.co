import React, { VFC } from 'react';

// Styles
import '../../styles/ContactButtonSmall.scss';

interface Props {
  addStyle?: string;
  icon: string;
  link: string;
  text: string;
}

export const ContactButtonSmall: VFC<Props> = ({
  addStyle = '',
  icon,
  link,
  text,
}) => {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <button className={`contact__button_small ${addStyle}`}>
        <div className={`button__small__icon ${icon}`} />
        <div className="button__small__text">{text}</div>
      </button>
    </a>
  );
};

export default ContactButtonSmall;
