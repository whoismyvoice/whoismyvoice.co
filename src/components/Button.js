import React from 'react'
import { Link } from 'react-router'

// Styles
import style from './../styles/Button.scss';

const Button = React.createClass({
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
