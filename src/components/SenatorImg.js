import React from 'react';

// Styles
import style from './../styles/SenatorImg.scss';

const SenatorImg = React.createClass({
  render() {
    return (
    	<div className="senatorImg">
    		<img src={'https://raw.githubusercontent.com/unitedstates/images/gh-pages/congress/original/'+this.props.bioguide+'.jpg'} />
    	</div>
    );
  }
});

export default SenatorImg;
