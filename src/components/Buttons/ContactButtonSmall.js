import React from 'react';
import PropTypes from 'prop-types';

// Styles
import '../../styles/ContactButtonSmall.css';

const ContactButtonSmall = ({
  add_style,
  icon,
  link,
  text,
}) => {
  return <a href={link} target="_blank">
    <button className={`contact__button_small ${add_style}`}>
      <div className={`button__small__icon ${icon}`} />
      <div className="button__small__text">
        {text}
      </div>
    </button>
  </a>;
};

ContactButtonSmall.propTypes = {
  add_style: PropTypes.string,
  icon: PropTypes.string,
  link: PropTypes.string,
  text: PropTypes.string,
};

export default ContactButtonSmall;
