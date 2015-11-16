import React from 'react';

// Component
import BaseComponent from '../BaseComponent';

// Styles
import style from './../../styles/SenatorName.scss';

class SenatorName extends BaseComponent {
  render() {
    let {name, state, age, twitter, voted, party} = this.props,
        member_age = age === undefined ? '' : `${age} years old`,
        twitterHandle = twitter === undefined ? '' : `@${twitter}`,
        voteFavor = voted === 'Yea' ? 'Yes' : 'No',
        member_voted = voted === undefined ? '' : `Voted ${voteFavor}`;

    return <div className="senatorName">
    	<h2>{name} ({party} - {state})</h2>
    	<h2 className="age">{member_age}</h2>
      <h2 className="twitterHandle">
        {member_voted}
        {twitterHandle}
      </h2>
    </div>;
  }
};

SenatorName.propTypes = {
  age: React.PropTypes.number,
  name: React.PropTypes.string,
  state: React.PropTypes.string,
  twitter: React.PropTypes.string,
  voted: React.PropTypes.string
};

export default SenatorName;
