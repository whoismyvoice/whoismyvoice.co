import React from 'react';
import SenateConstants from '../constants/SenateConstants';
import HFCMembers from '../data/HFCMembers';

// Components
import Circle from './Circle';
import ArrowDown from './ArrowDown';
import SupportActions from './Senator/SupportActions';
import HFCOverview from './HFCOverview';
import FadedBG from './FadedBg';
import CongressmanGroup from './Senator/CongressmanGroup';

const Results = React.createClass({

	render() {
		const vote_status = this.props.vote_status,
				  impact = this.props.impact,
				  current_member = this.props.current_member,
          zip_code = this.props.zip_code,
          numRep = this.props.numRep;

    if(SenateConstants.CHAMBER === 'senate' && numRep === 0) {
      return <div className={this.props.backgroundClasses} id="fullpage">
        <FadedBG color="red" />
        <div className="section block two">
          <p className="impact">
            No! Your senators support Planned Parenthood!<br />
            But have you heard of the House Freedom Caucus? The HFC is a group of 40+ conservative congressmen who have publicly declared they will oppose any spending bill that does not defund Planned Parenthood. 
            Yes, these men and women are willing to shut down your government over this issue. <span className="strike-out">If you live in their district</span>, email them. If you don’t, tweet at them.
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
