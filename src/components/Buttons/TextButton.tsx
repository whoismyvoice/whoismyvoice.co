import React from 'react';
import cx from 'classnames';

// Styles
import '../../styles/TextButton.css';

interface Props {
  link?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  text: string;
}

interface State {
  buttonClasses: string;
}

class TextButton extends React.Component<Props, State> {
  static defaultProps = {
    onClick: () => undefined,
  };

  state = {
    buttonClasses: 'text-button',
  };

  constructor(props: Props) {
    super(props);
    const { text } = props;
    this.state = {
      buttonClasses: this.getButtonClasses(text),
    };
  }

  getButtonClasses(text: string) {
    return cx('text-button', {
      'text-button--back': text === 'Back',
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps: Readonly<Props>) {
    const { text } = this.props;
    const nextText = nextProps.text;
    if (text !== nextText) {
      this.setState({
        buttonClasses: this.getButtonClasses(nextText),
      });
    }
  }

  render() {
    const { link, onClick, text } = this.props;
    const { buttonClasses } = this.state;
    return (
      <a href={link} className={buttonClasses} onClick={onClick}>
        {text}
        <span className="text-button-border" />
      </a>
    );
  }
}

export default TextButton;
