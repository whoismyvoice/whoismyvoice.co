import React from 'react'
import HFCMembers from '../data/HFCMembers'

// Components
import Circle from './Circle'
import SenatorGroup from './Senator/SenatorGroup'
import ArrowDown from './ArrowDown'
import SupportActions from './Senator/SupportActions'
import HFCOverview from './HFCOverview'

const Results = React.createClass({

	render() {
		var isHFC = this.props.hfc,
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
				party = this.props.party

		if (isHFC) {
			return <div className={this.props.backgroundClasses} id="fullpage">
         <div className="section block two">

          <p className="impact">
            No! Your senators support Planned Parenthood!<br />
            But, have you heard of the House Freedom Caucus? These are the guys who have publicly declared they are willing to shut down the government over the issue of funding Planned Parenthood.
          </p>

          <HFCOverview
            color="bright-red"
            members={HFCMembers}
          />

        </div>
      </div>;
		} else {
			return <div className={this.props.backgroundClasses} id="fullpage">
      	 <div className="section block two">

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
