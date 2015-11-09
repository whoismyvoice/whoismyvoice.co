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
		const vote_status = this.props.vote_status,
          impact = this.props.impact,
          current_member = this.props.current_member,
          zip_code = this.props.zip_code,
          numRep = this.props.numRep,
          representatives = this.props.representatives,
          backgroundClasses = this.props.backgroundClasses;

    console.log(this.props.representatives);

    if (Settings.chamber === 'senate' && numRep === 0) {
      return <div className={backgroundClasses} id="fullpage">
        <FadedBG color="red" />
        <div className="section block two">
          <p className="impact">
            {Settings.senate.no_cosponsor_title} <br />
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
		  return <div className={backgroundClasses} id="fullpage">
        <div className="section block two">
          <Circle
            style="wide"
            desc={vote_status}
            numRep={numRep}
            representatives={this.props.representatives}
          />
          <CongressmanGroup
            representatives={this.props.representatives}
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
            representatives={this.props.representatives}
            currentSenator={current_member}
          />
        </div>
      </div>;
    }
  }
});

export default Results;
