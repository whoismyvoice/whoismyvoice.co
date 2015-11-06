import React from 'react';

// Components
import Circle from './Circle';
import ArrowDown from './ArrowDown';
import SupportActions from './Senator/SupportActions';
import FadedBG from './FadedBg';
import CongressmanGroup from './Senator/CongressmanGroup';

const Results = React.createClass({

	render() {
		const additional_member = this.props.additional_member,
				  age = this.props.age,
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
				  party = this.props.party,
          zip_code = this.props.zip_code,
          numRep = this.props.numRep;

		return <div className={this.props.backgroundClasses} id="fullpage">
      <div className="section block two">
        <Circle
          style="wide"
          additional={additional_member}
          age={age}
          gender={gender}
          desc={vote_status}
          numRep={numRep}
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
          additional={additional_member}
          currentSenator={current_member}
          gender={gender}
          email={email}
          tel={tel}
          twitter={twitter}
          party={party}
        />
      </div>
    </div>;
  }
});

export default Results;
