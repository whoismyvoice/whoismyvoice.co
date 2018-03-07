import React, { Component, } from 'react';
import PropTypes from 'prop-types';

// Styles
import '../../styles/TextButton.css';

class TextButton extends Component {
  render() {
    const { link, text, } = this.props;
    let buttonClasses = 'text-button';
    if (text === 'Back') {
      buttonClasses = buttonClasses + 'text-button--back';
    }
    return <a href={link} className={buttonClasses} onClick={this.props.onClick}>
      {text}
      <span className="text-button-border">
      </span>
  	</a>;
  }
}

TextButton.propTypes = {
  link: PropTypes.string,
  text: PropTypes.string,
};

export default TextButton;
