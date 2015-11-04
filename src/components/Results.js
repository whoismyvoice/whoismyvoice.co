import React from 'react';
import HFCMembers from '../data/HFCMembers';

// Components
import Circle from './Circle';
import SenatorGroup from './Senator/SenatorGroup';
import ArrowDown from './ArrowDown';
import SupportActions from './Senator/SupportActions';
import HFCOverview from './HFCOverview';
import FadedBG from './FadedBg';

const Results = React.createClass({

	render() {
		const isHFC = this.props.hfc,
				  additional_member = this.props.additional_member,
				  age = this.props.age,
				  did_search = this.props.did_search,
				  gender = this.props.gender,
				  vote_status = this.props.vote_status,
				  bioguide = this.props.bioguide,
				  name = this.props.name,
				  state = this.props.state,
				  additional_exists = this.props.additional_exists,
				  impact = this.props.impact,
				  current_member = this.props.current_member,
				  email = this.props.email,
				  tel = this.props.tel,
				  twitter = this.props.twitter,
				  party = this.props.party;

		if (isHFC) {
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
            <div className="blocker"></div>
            <Circle
              style="wide"
              additional={additional_member}
              hfc={isHFC}
              age={age}
              did_search={did_search}
              gender={gender}
              desc={vote_status}
            />

            <SenatorGroup
              additional={additional_member}
              bioguide={bioguide}
              hfc={isHFC}
              name={name}
              age={age}
              did_search={did_search}
              state={state}
            />

            <ArrowDown
              additional={additional_exists}
              color='orange-text'
              id='0'
            />
          </div>

          <div className="section block three">
            <Circle
              style="wider"
              hide={true}
              desc={impact}
            />

            <SupportActions
              additional={additional_member}
              currentSenator={current_member}
              hfc={isHFC}
              gender={gender}
              email={email}
              tel={tel}
              twitter={twitter}
              party={party}
            />
          </div>
     	</div>;
		}
  }
});

export default Results;
