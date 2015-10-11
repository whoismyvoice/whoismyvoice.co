import React from 'react';

// Styles
import style from './../styles/Circle.scss';

const Circle = React.createClass({
  render() {
    return (
    	<div className="circle">
    		<div className="description">
    			{this.props.desc}
    		</div>
    	</div>
    );
  }
});

export default Circle;