import React from 'react';

// Styles
import style from './../../styles/SenatorImg.scss';

const SenatorImg = React.createClass({
  render() {

  	// Check if bioguide is defined (i.e. if user has searched for any members yet)

  	const imgSrc ='https://raw.githubusercontent.com/unitedstates/images/gh-pages/congress/original/';
  	const img = this.props.bioguide === '' ? '' : imgSrc+this.props.bioguide+'.jpg';

  	return (
    	<div className="senatorImg">
    		<img
    			src={img} 
    		/>
    	</div>
    );
  }
});

export default SenatorImg;
