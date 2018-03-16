import React, { Component } from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

// Styles
import '../../styles/Button.css';

class Button extends Component {
  render() {
    const { color, link, text, secondary, flush, type } = this.props;
    if (type === 'external') {
      return (
        <a href={link} className={color} target="_blank">
          <span className="button">
            <div className="button-text">{text}</div>
            <div className="secondary">{secondary}</div>
          </span>
        </a>
      );
    } else if (flush === true) {
      return (
        <Link to={link}>
          <button className={`button button--nav ${color}`}>{text}</button>
        </Link>
      );
    } else if (type === 'internal') {
      return (
        <Link to={link}>
          <button className={`button ${color}`}>{text}</button>
        </Link>
      );
    } else {
      return (
        <Link to={link}>
          <button className={`button button--nav ${color}`}>{text}</button>
        </Link>
      );
    }
  }
}

Button.propTypes = {
  color: PropTypes.string,
  flush: PropTypes.bool,
  link: PropTypes.string,
  secondary: PropTypes.string,
  text: PropTypes.string,
  type: PropTypes.string,
};

export default Button;
