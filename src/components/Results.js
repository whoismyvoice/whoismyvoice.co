import React from 'react';
import Settings from '../data/settings.json';
import HFCMembers from '../data/HFCMembers';
import SenateActions from '../actions/SenateActions';

// Components
import TitleComponent from './TitleComponent';
import TextButton from './TextButton';
import SupportActions from './Senator/SupportActions';
import HFCOverview from './HFCOverview';
import FadedBG from './FadedBg';
import CongressmanGroup from './Senator/CongressmanGroup';
import BaseComponent from './BaseComponent';
import Button from './Button';

class Results extends BaseComponent {
  constructor() {
    super();
    this._bind('_handleClick', '_destroyFullpage', '_handleRestart');
  }

  _destroyFullpage() {
    if ($.fn.fullpage.destroy !== undefined) {
      $.fn.fullpage.destroy();
    }
  }

  _handleRestart() {
    SenateActions.flush();
    this._destroyFullpage();
  }

  _handleClick(event) {
    event.preventDefault();
    event.stopPropagation();
    // Listen for event.target.id in order to decipher which of the arrows was tapped
    //ContainerActions.setCurrentMember(event.target.id);
    $.fn.fullpage.moveSectionDown();
  }

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
        <TextButton
          text="Back"
          onClick={this._handleRestart}
        />
        <CongressmanGroup
          representatives={representatives}
          zip_code={zip_code}
        />
        <TitleComponent
          number_representatives={numRep}
          did_search={did_search}
          vote_status={vote_status}
          pre_text={pre_text}
          represent={true}
          represent_gender={this.props.represent_gender}
        />
        <TextButton
          text="What can I do?"
          onClick={this._handleClick}
        />
      </div>
      <div className="section block three">
        <TitleComponent
          desc={impact}
          actions={true}
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
