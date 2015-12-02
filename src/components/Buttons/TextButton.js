import React from 'react';
import { Link } from 'react-router';

// Component
import BaseComponent from '../BaseComponent';

// Styles
import style from '../../styles/TextButton.scss';

class TextButton extends BaseComponent {
  render() {
    const {link, flush, text} = this.props;
    return <a href={link} className="text-button" onClick={this.props.onClick}>
      {text}
      <div className="text-button-border">
      </div>
  	</a>;
  }
}

TextButton.propTypes = {
  flush: React.PropTypes.bool,
  link: React.PropTypes.string,
  text: React.PropTypes.string,
};

export default TextButton;
