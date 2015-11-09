import React from 'react';
import HFCGroup from './Senator/HFCGroup';

// Styles
import style from './../styles/HFCGroup.scss';

const HFCOverview = React.createClass({
  propTypes: {
    color: React.PropTypes.string,
    members: React.PropTypes.object
  },
  componentDidMount: function() {
    $(document).scrollTop(0);
  },
  render() {
  	// Shuffle function to make sure that congressmen are not shown the same way each time
    function shuffle(o) {
      for (let j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);

      return o;
    }

  	const shuffledMembers = shuffle(this.props.members),

    members = shuffledMembers.map(function(member, idx) {
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

    return <div className={'HFCOverview ' + this.props.color}>
      {members}
    </div>;
  }
});

export default HFCOverview;
