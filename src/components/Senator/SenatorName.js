import React from 'react';

// Styles
import style from './../../styles/SenatorName.scss';

const SenatorName = React.createClass({
  render() {

  	var name,
  			age,
        title,
        party;

  	if(this.props.did_search) {

      title = this.props.random ? 'Congressman' : 'Senator';
      name = title + ' ' + this.props.name;
  		age = this.props.age + ' years old';

  	} else {
  		name = '';
  		age = '';
  	}
  	
    return <div className="senatorName">
    	<h2>{ name } ({this.props.state})</h2>
    	<h2>{ age }</h2>
    </div>;
  }
});

export default SenatorName;
