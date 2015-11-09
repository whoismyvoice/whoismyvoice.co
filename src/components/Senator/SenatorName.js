import React from 'react';

// Styles
import style from './../../styles/SenatorName.scss';

const SenatorName = React.createClass({
  propTypes: {
    age: React.PropTypes.number,
    name: React.PropTypes.string,
    state: React.PropTypes.string,
    twitter: React.PropTypes.string,
    voted: React.PropTypes.string
  },
  render() {
  	const name = this.props.name,
        age = this.props.age === undefined ? '' : `${this.props.age} years old`,
        twitterHandle = this.props.twitter === undefined ? '' : `@${this.props.twitter}`,
        state = this.props.state,
        voted = this.props.voted === undefined ? '' : `Voted ${this.props.voted}`;

    return <div className="senatorName">
    	<h2>{name} ({state})</h2>
    	<h2 className="age">{age}</h2>
      <h2 className="twitterHandle">
        {voted}
        {twitterHandle}
      </h2>
    </div>;
  }
});

export default SenatorName;
