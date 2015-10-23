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
		var isHFC = this.props.hfc;

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
              additional={this.props.additional_member}
              hfc={this.props.hfc}
              age={this.props.age}
              did_search={this.props.did_search}
              gender={this.props.gender}
              desc={this.props.vote_status}
            />

            <SenatorGroup
              additional={this.props.additional_member}
              bioguide={this.props.bioguide}
              hfc={this.props.hfc}
              name={this.props.name}
              age={this.props.age}
              did_search={this.props.did_search}
              state={this.props.state}
            />

            <ArrowDown 
              className="orange"
              additional={this.props.additional_exists}
              id='0'
            />
          </div>

          <div className="section block three">
            <Circle 
              style="wider"
              hide={true}
              desc={this.props.impact} 
            />

            <SupportActions
              additional={this.props.additional_member}
              currentSenator={this.props.current_member}
              hfc={this.props.additional_member} 
              gender={this.props.gender} 
              email={this.props.email} 
              tel={this.props.tel} 
              twitter={this.props.twitter}
              party={this.props.party}
            />
          </div>
     	</div>;
		}
  }
});

export default Results;
