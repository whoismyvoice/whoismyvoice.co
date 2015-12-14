import React from 'react';

// Component
import BaseComponent from '../BaseComponent';

// Styles
import style from '../../styles/ContactButton.scss';

class ContactButton extends BaseComponent {
  render() {
    const {icon, text, detail, link} = this.props;
    return <a href={link} target="_blank">
      <button className="contact__button">
        <div className={`button__icon ${icon}`}>
        </div>
        <div className="button__text">
          {text}
        </div>
{/*        <div className="button__detail">
          {detail}
        </div>*/}
      </button>
    </a>;
  }
}

export default ContactButton;
