import React from 'react';
import { Link } from 'react-router';

// Styles
import style from './../styles/Button.scss';

const Button = React.createClass({
  render() {
  	if(this.props.type === 'external') {
  		return (
  			<a href={this.props.link} target="_blank">
  				<button className="button">
  					{this.props.text}
  				</button>
  			</a>
  		)
  	} else {
  		return (
      	<Link to={this.props.link}>
        	<button className="button nav">
        		{this.props.text}
        	</button>
      	</Link>
    	);
  	}
  }
});

export default Button;
