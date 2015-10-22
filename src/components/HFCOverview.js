import React from 'react';
import HFCGroup from './Senator/HFCGroup'

// Styles
import style from './../styles/HFCGroup.scss';

const HFCOverview = React.createClass({
 
  render() {
  	var members = this.props.members.map(function(member, idx) {
  		member = (
  			<HFCGroup
      			bioguide={member.bioguide}
      			name={member.name}
      			age={member.age}
      			twitter={member.twitter}
      			state={member.state}
      			did_search={true}
      			hfc={true}
      			key ={idx}
      		/>
		);
		return member;
  	});

    return  <div className="HFCOverview">
      {members}
    </div>;
  }
});

export default HFCOverview;
