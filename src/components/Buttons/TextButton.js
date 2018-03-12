import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

// Styles
import '../../styles/TextButton.css';

class TextButton extends Component {
  static defaultProps = {
    onClick: () => {},
  }

  static propTypes = {
    link: PropTypes.string,
    onClick: PropTypes.func,
    text: PropTypes.string.isRequired,
  }

  state = {
    buttonClasses: 'text-button',
  }

  constructor(props) {
    super(props);
    const { text, } = props;
    this.state = {
      buttonClasses: this.getButtonClasses(text),
    }
  }

  getButtonClasses(text) {
    return cx(
      'text-button',
      {
        'text-button--back': text === 'Back',
      },
    );
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const { text, } = this.props;
    const nextText = nextProps.text;
    if (text !== nextText) {
      this.setState({
        buttonClasses: this.getButtonClasses(nextText),
      })
    }
  }

  render() {
    const { link, text, } = this.props;
    const { buttonClasses, } = this.state;
    return <a href={link} className={buttonClasses} onClick={this.props.onClick}>
      {text}
      <span className="text-button-border">
      </span>
  	</a>;
  }
}

export default TextButton;
