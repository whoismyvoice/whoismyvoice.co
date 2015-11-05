import React from 'react';
import SenatorImg from './SenatorImg';
import SenatorName from './SenatorName';
import ArrowDown from '../ArrowDown';
import SearchAddress from '../SearchAddress';

// Styles
import style from './../../styles/SenatorGroup.scss';

const CongressmanGroup = React.createClass({
  render() {
    let representatives = (this.props.representatives || []).map(function(item, idx) {
      return <div className="senatorContainer" key={idx}>
        <SenatorImg
          bioguide={item.bioguide_id}
        />

        <SenatorName
          name={item.first_name}
          age={item.birthday}
          state={item.state}
          voted={item.voted}
        />

        <ArrowDown 
          id="0" 
          additional={item.additional} 
          double={"true"} 
          color="orange-text" 
        />
      </div>;
    });
    return <div className="senatorWrapper">
      {representatives}

      <SearchAddress
        zip_code={this.props.zip_code}
      />

    </div>;
  }
});
export default CongressmanGroup;
