import React from 'react';
import Settings from '../data/settings.json';
import HFCMembers from '../data/HFCMembers';

// Components
import Circle from './Circle';
import ArrowDown from './ArrowDown';
import SupportActions from './Senator/SupportActions';
import HFCOverview from './HFCOverview';
import FadedBG from './FadedBg';
import CongressmanGroup from './Senator/CongressmanGroup';
import BaseComponent from './BaseComponent';
import Button from './Button';

class Results extends BaseComponent {
	render() {
		const {
      vote_status,
      impact,
      current_member,
      zip_code,
      numRep,
      representatives,
      backgroundClasses,
      first_reps,
      initialize
    } = this.props,

    {no_cosponsor_title, no_cosponsor_desc} = Settings.senate,
    {chamber} = Settings;

    if (chamber === 'senate' && numRep === 0) {
      return <div className={backgroundClasses} id="fullpage">
        <FadedBG color="red" />
        <div className="section block two">
          <p className="impact">
            {no_cosponsor_title} <br />
            {no_cosponsor_desc}
          </p>
          <HFCOverview
            color="bright-red"
            members={HFCMembers}
          />
          <ArrowDown
            color="red-text"
            scroll={"true"}
          />
        </div>
      </div>;
    } else {
		  return <div className={backgroundClasses} id="fullpage">
        <div className="section block two">
          <Circle
            style="wide"
            desc={vote_status}
            numRep={numRep}
            representatives={representatives}
          />
          <CongressmanGroup
            representatives={representatives}
            zip_code={zip_code}
          />
        </div>
        <div className="section block three">
          <Circle
            style="wider"
            hide={true}
            desc={impact}
          />
          <SupportActions
            representatives={representatives}
            currentSenator={current_member}
          />
          <a
            className="internal-link"
            href="/about">
            About this project
          </a>

        </div>
      </div>;
    }
  }
};

Results.propTypes = {
  backgroundClasses: React.PropTypes.any,
  current_member: React.PropTypes.any,
  impact: React.PropTypes.string,
  numRep: React.PropTypes.number,
  representatives: React.PropTypes.array,
  vote_status: React.PropTypes.string,
  zip_code: React.PropTypes.string,
  initialize: React.PropTypes.func
};

export default Results;
