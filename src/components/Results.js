import React from 'react';

// Components
import Circle from './Circle';
import ArrowDown from './ArrowDown';
import SupportActions from './Senator/SupportActions';
import FadedBG from './FadedBg';
import CongressmanGroup from './Senator/CongressmanGroup';

const Results = React.createClass({

	render() {
		const vote_status = this.props.vote_status,
				  impact = this.props.impact,
				  current_member = this.props.current_member,
          zip_code = this.props.zip_code,
          numRep = this.props.numRep;

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
});

export default Results;
