import React from 'react';

// Styles
import style from './../../styles/SenatorImg.scss';

const SenatorImg = React.createClass({
  render() {
  	// Check if bioguide is defined (i.e. if user has searched for any members yet)
  	const img = this.props.bioguide === '' ? '' : 'https://raw.githubusercontent.com/unitedstates/images/gh-pages/congress/225x275/'+ this.props.bioguide +'.jpg';
    const single = this.props.single === true ? 'single': '';

  	return <div className={'senatorImg '+single}>
    	<img
    		src={img}
    	/>
    </div>;
  }
});

export default SenatorImg;
