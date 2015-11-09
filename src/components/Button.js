import React from 'react';
import { Link } from 'react-router';
import SenateActions from '../actions/SenateActions';

// Styles
import style from './../styles/Button.scss';

const Button = React.createClass({

  propTypes: {
    color: React.PropTypes.string,
    flush: React.PropTypes.bool,
    link: React.PropTypes.string,
    secondary: React.PropTypes.string,
    text: React.PropTypes.string,
    type: React.PropTypes.string
  },

  _destroyFullpage: function() {
    if ($.fn.fullpage.destroy !== undefined) {
      $.fn.fullpage.destroy('all');
    }
  },

  _handleRestart: function() {
    SenateActions.flush();
    this._destroyFullpage();
  },
  render() {
    const {color, link, text, secondary, flush}= this.props;

    if (this.props.type === 'external') {
      return <a href={link} className={color} target="_blank">
  				<button className="button">
            <div className="text">
              {text}
            </div>
            <div className="secondary">
              {secondary}
            </div>
  				</button>
  			</a>;
  	} else if (flush === true) {
  		return <Link to={link}>
        <button className={`button nav ${color}`} onClick={this._handleRestart}>
          {text}
        </button>
      </Link>;
  	} else {
      return <Link to={link}>
        <button className={`button nav ${color}`}>
          {text}
        </button>
      </Link>;
    }
  }
});

export default Button;
