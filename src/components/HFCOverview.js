import React from 'react';
import HFCGroup from './Senator/HFCGroup'

// Styles
import style from './../styles/HFCGroup.scss';

const HFCOverview = React.createClass({
  render() {
    return  <div className="HFCOverview">

      <HFCGroup
      	bioguide={'S001188'}
      	name={'test'}
      	age={'test'}
      	state={'Texas'}
      	did_search={true}
      	random={true}
      />

    </div>;
  }
});

export default HFCOverview;
