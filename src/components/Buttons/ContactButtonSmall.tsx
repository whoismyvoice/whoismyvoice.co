import * as React from 'react';

// Styles
import '../../styles/ContactButtonSmall.css';

interface Props {
  addStyle?: string;
  icon: string;
  link: string;
  text: string;
}

const ContactButtonSmall = ({ addStyle, icon, link, text }: Props) => {
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
