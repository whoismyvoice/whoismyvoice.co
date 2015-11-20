import React from 'react';
import Settings from '../data/settings.json';
import HFCMembers from '../data/HFCMembers';

// Components
import TitleComponent from './TitleComponent';
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
      did_search,
      representatives,
      backgroundClasses,
      pre_text,
      chamber
    } = this.props;

    return <div className={backgroundClasses} id="fullpage">
      <div className="section block two">
      <CongressmanGroup
          representatives={representatives}
          zip_code={zip_code}
        />
        <TitleComponent
          number_representatives={numRep}
          did_search={did_search}
          vote_status={vote_status}
          pre_text={pre_text}
        />
      </div>
      <div className="section block three">
        <TitleComponent
          desc={impact}
        />
        <SupportActions
          representatives={representatives}
          currentSenator={current_member}
        />
      </div>
    </div>;
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
};

export default Results;
