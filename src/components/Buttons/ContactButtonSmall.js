import React from 'react';

// Component
import BaseComponent from '../BaseComponent';

// Styles
import style from '../../styles/ContactButtonSmall.scss';

class ContactButtonSmall extends BaseComponent {
  render() {
    const {icon, link, text, add_style} = this.props;
    return <a href={link} target="_blank">
      <button className={`contact__button_small ${add_style}`}>
        <div className={`button__small__icon ${icon}`} />
        <div className="button__small__text">
          {text}
        </div>
      </button>
    </a>;
  }
}

ContactButtonSmall.propTypes = {
  detail: React.PropTypes.string,
  icon: React.PropTypes.string,
  link: React.PropTypes.string,
  text: React.PropTypes.string
};

export default ContactButtonSmall;
