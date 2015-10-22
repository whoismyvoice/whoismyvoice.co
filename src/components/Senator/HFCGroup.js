import React from 'react';
import SenatorImg from './SenatorImg'
import SenatorName from './SenatorName'

// Styles
import style from './../../styles/HFCGroup.scss';

const HFCGroup = React.createClass({
  render() {
    return  <div className="HFCMember">

      <SenatorImg 
        bioguide={this.props.bioguide}
      />

      <SenatorName
        name={this.props.name}
        age={this.props.age}
        state={this.props.state}
        did_search={this.props.did_search}
        random={this.props.random}
      />

    </div>;
  }
});

export default HFCGroup;
