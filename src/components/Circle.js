import React from 'react'

// Styles
import style from './../styles/Circle.scss';

const Circle = React.createClass({
  render() {

  	var random = this.props.random ? 'long' : '',
  		status = this.props.random ? 'No!' : 'Yes!',
  		details;

  	if(!this.props.random) {
  		details = 'a ' + this.props.age + ' year old ' + this.props.gender + ' ';
  	}

  	if(this.props.random !== undefined) {

  		return <div className={'circle' + ' ' + this.props.style + ' ' + random}>
  			<div className="description">
  				{status} <br />
  				Your Senator, <br />
  				<span className="strike-out">
  					{details}
  				</span>
  				{this.props.desc}
  			</div>
  		</div>;

  	} else {

  		return	<div className={'circle ' + ' ' + this.props.style + ' ' + random}>
    		<div className="description">
    			{this.props.desc}
    		</div>
    	</div>;
  	}
  }
});

export default Circle;
