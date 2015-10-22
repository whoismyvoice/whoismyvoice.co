import React from 'react';
import SenatorImg from './SenatorImg'
import SenatorName from './SenatorName'

// Styles
import style from './../../styles/HFCGroup.scss';

const HFCGroup = React.createClass({
  render() {
    return  <div className="HFCMember">

      <SenatorImg 
        bioguide={'Y000065'}
      />

      <SenatorName
        name={this.props.name}
        age={this.props.age}
        state={this.props.state}
        twitter={this.props.twitter}
        did_search={this.props.did_search}
        hfc={this.props.hfc}
      />

    </div>;
  }
});

export default HFCGroup;
