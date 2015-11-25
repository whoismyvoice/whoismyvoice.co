import React from 'react';
import HFCMembers from '../data/HFCMembers';

// Components
import BaseComponent from './BaseComponent';
import FadedBG from './FadedBg';
import HFCOverview from './HFCOverview';

class Senators extends BaseComponent {
  componentDidMount() {
    $(document).scrollTop(0);
  }

  render() {
    return  <div className="page-block senator-block light-white">
      <FadedBG color="white" />
      <p className="page-introduction">
      	Meet the members of the House Freedom Caucus. The HFC is a group of 40+ conservative congressmen who have publicly declared they will oppose any spending bill that does not defund Planned Parenthood.
				Yes, these men and women are willing to shut down your government over this issue. <span className="strike-out">If you live in their district</span>, email them. If you don’t, tweet at them.
      </p>
      <br />
      <HFCOverview
    		members={HFCMembers}
    	/>
    </div>;
  }
}

export default Senators;
