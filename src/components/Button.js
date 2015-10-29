import React from 'react'
import { Link } from 'react-router'
import SenateActions from '../actions/SenateActions'

// Styles
import style from './../styles/Button.scss';

const Button = React.createClass({

  _destroyFullpage: function() {
    if($.fn.fullpage.destroy !== undefined) {
      $.fn.fullpage.destroy('all');
    }
  },

  _handleRestart: function(evt) {
    SenateActions.flush();
    this._destroyFullpage();
  },

  render() {

    var color = this.props.color;

  	if (this.props.type === 'external') {
  		return (
  			<a href={this.props.link} className={color} target="_blank">
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
  		return <Link to={this.props.link}>
          <button className={'button nav '+color} onClick={this._handleRestart}>
        	 {this.props.text}
        </button>
        </Link>;
  	} else {
      return <Link to={this.props.link}>
        <button className={'button nav '+color}>
          {this.props.text}
        </button>
      </Link>;
    }
  }
});

export default Button;
