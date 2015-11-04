import React from 'react';
import stateConverter from '../../utils/StateConverter';

// Styles
import style from './../../styles/SenatorName.scss';

const SenatorName = React.createClass({
  render() {
  	const title = this.props.hfc ? '' : 'Senator',
        name = title + ' ' + this.props.name,
        age = this.props.age === undefined ? '' : this.props.age + ' years old',
        twitterHandle = this.props.twitter === undefined ? '' : '@'+this.props.twitter,
        state = stateConverter.abbrState(this.props.state, 'name');

    return <div className="senatorName">
    	<h2>{name} ({state})</h2>
    	<h2 className="age">
        {age}
      </h2>
      <h2 className="twitterHandle">
        {twitterHandle}
      </h2>
    </div>;
  }
});

export default SenatorName;
