import React from 'react';
import TextButton from './TextButton';

class TextFormButton extends TextButton {
  render() {
    const { text, } = this.props;
    const { buttonClasses, } = this.state;
    return <button type="submit" className={buttonClasses} onClick={this.props.onClick}>
      {text}
      <span className="text-button-border">
      </span>
  	</button>;
  }
}

export default TextFormButton;
