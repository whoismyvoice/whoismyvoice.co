import React from 'react';
import { Link } from 'react-router';
import SenateActions from '../actions/SenateActions';

// Component
import BaseComponent from './BaseComponent';

// Styles
import style from './../styles/Button.scss';

class TextButton extends BaseComponent {
  constructor() {
    super();
    this._bind('_destroyFullpage', '_handleRestart');
  }

  _destroyFullpage() {
    if ($.fn.fullpage.destroy !== undefined) {
      $.fn.fullpage.destroy();
    }
  }

  _handleRestart() {
    SenateActions.flush();
    this._destroyFullpage();
  }

  render() {
    const {link, flush, text} = this.props;

    return <a href={link} className="text-button" onClick={this.props.onClick}>
      <div className="text">
        {text}
      </div>
      <div className="border">
      </div>
  	</a>;
  }
};

TextButton.propTypes = {
  flush: React.PropTypes.bool,
  link: React.PropTypes.string,
  text: React.PropTypes.string,
};

export default TextButton;
