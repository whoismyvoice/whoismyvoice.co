import React from 'react';

// Styles
import style from './../styles/SenatorName.scss';

const SenatorName = React.createClass({
  render() {
    return (
    	<div className="senatorName">
    		<h2>Senator {this.props.name}</h2>
    		<h2>{this.props.age} years old</h2>
    	</div>
    );
  }
});

export default SenatorName;
