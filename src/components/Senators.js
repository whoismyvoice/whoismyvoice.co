import React from 'react'
import { Link } from 'react-router'
import HFCOverview from './HFCOverview'
import HFCMembers from '../data/HFCMembers'
import ArrowDown from './ArrowDown'
import WhiteBorder from './WhiteBorder'

const Senators = React.createClass({
  componentDidMount: function() {
    $(document).scrollTop(0);
  },
  render() {
    return  <div className="page-block senators blue">
      <div className="black-top-line"></div>
      <WhiteBorder />
      <p className="pageIntroduction">
      	Meet the members of the House Freedom Caucus. The HFC is a group of 40+ conservative congressmen who have publicly declared they will oppose any spending bill that does not defund Planned Parenthood. 
				Yes, these men and women are willing to shut down your government over this issue. <span className="strike-out">If you live in their district</span>, email them. If you don’t, tweet at them.
      </p><br />

      <HFCOverview
    		members={HFCMembers}
    	/>

      <ArrowDown
        scroll='true'
        color='blue-text'
      />
    </div>;
  }
});

export default Senators;
