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

const Results = React.createClass({
  propTypes: {
    backgroundClasses: React.PropTypes.any,
    current_member: React.PropTypes.number,
    impact: React.PropTypes.string,
    numRep: React.PropTypes.number,
    representatives: React.PropTypes.array,
    vote_status: React.PropTypes.string,
    zip_code: React.PropTypes.string
  },
	render() {
		const voteStatus = this.props.vote_status,
				  impact = this.props.impact,
				  currentMember = this.props.current_member,
          zipCode = this.props.zip_code,
          numRep = this.props.numRep;

    if (Settings.chamber === 'senate' && numRep === 0) {
      return <div className={this.props.backgroundClasses} id="fullpage">
        <FadedBG color="red" />
        <div className="section block two">
          <p className="impact">
            {Settings.senate.no_cosponsor_title}<br />
            {Settings.senate.no_cosponsor_desc}
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
		  return <div className={this.props.backgroundClasses} id="fullpage">
        <div className="section block two">
          <Circle
            style="wide"
            desc={voteStatus}
            numRep={numRep}
            representatives={this.props.representatives}
          />
          <CongressmanGroup
            representatives={this.props.representatives}
            zip_code={zipCode}
          />
        </div>
        <div className="section block three">
          <Circle
            style="wider"
            hide={true}
            desc={impact}
          />
          <SupportActions
            representatives={this.props.representatives}
            currentSenator={currentMember}
          />
        </div>
      </div>;
    }
  }
});

export default Results;
