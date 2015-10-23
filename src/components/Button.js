import React from 'react'
import { Link } from 'react-router'
import SenateActions from '../actions/SenateActions'

// Styles
import style from './../styles/Button.scss';

const Button = React.createClass({

  _destroyFullpage: function() {
    if($.fn.fullpage.destroy !== undefined) {
      $.fn.fullpage.destroy();
    }
  },

  _handleRestart: function(evt) {
    SenateActions.flush();
    this._destroyFullpage();
  },

  render() {
  	if (this.props.type === 'external') {
  		return (
  			<a href={this.props.link} target="_blank">
  				<button className="button">
            <div className="text">
  					   {this.props.text}
            </div>
            <div className="secondary">
              {this.props.secondary}
            </div>
  				</button>
  			</a>
  		)
  	} else if(this.props.flush === true) {
  		return <button className="button nav" onClick={this._handleRestart}>
        <Link to={this.props.link}>
        	{this.props.text}
        </Link>
      </button>;
  	} else {
      return <button className="button nav">
        <Link to={this.props.link}>
          {this.props.text}
        </Link>
      </button>;
    }
  }
});

export default Button;
