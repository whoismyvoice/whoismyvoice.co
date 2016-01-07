import React from 'react';

// Styles
import style from '../../styles/ContactButtonSmall.scss';

const ContactButtonSmall = (props) => {
  return <a href={props.link} target="_blank">
    <button className={`contact__button_small ${props.add_style}`}>
      <div className={`button__small__icon ${props.icon}`} />
      <div className="button__small__text">
        {props.text}
      </div>
    </button>
  </a>;
};

ContactButtonSmall.propTypes = {
  add_style: React.PropTypes.string,
  detail: React.PropTypes.string,
  icon: React.PropTypes.string,
  link: React.PropTypes.string,
  text: React.PropTypes.string
};

export default ContactButtonSmall;
