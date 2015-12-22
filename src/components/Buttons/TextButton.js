import React from 'react';
import cx from 'classnames';

// Component
import BaseComponent from '../BaseComponent';

// Styles
import style from '../../styles/TextButton.scss';

class TextButton extends BaseComponent {
  render() {
    const {link, text} = this.props,
    buttonClasses = cx(
      ['text-button'],
      {'text-button--back': text === 'Back'}
    );
    return <a href={link} className={buttonClasses} onClick={this.props.onClick}>
      {text}
      <div className="text-button-border">
      </div>
  	</a>;
  }
}

TextButton.propTypes = {
  link: React.PropTypes.string,
  text: React.PropTypes.string,
};

export default TextButton;
