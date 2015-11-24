import React from 'react';
import HFCMembers from '../data/HFCMembers';
import SenateActions from '../actions/SenateActions';

// Components
import TitleComponent from './TitleComponent';
import TextButton from './TextButton';
import SupportActions from './Member/SupportActions';
import HFCOverview from './HFCOverview';
import CongressmanGroup from './Member/CongressmanGroup';
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
      backgroundClasses
    } = this.props;

    return <div className={backgroundClasses} id="fullpage">
      <div className="section block two">
        <TextButton
          text="Back"
          onClick={this._handleRestart}
        />
        <CongressmanGroup />
        <TitleComponent
          represent={true}
          classes="title-component--results"
        />
        <div className="line-seperator line-seperator--small"></div>
        <TextButton
          text="What can I do?"
          onClick={this._handleClick}
        />
      </div>
      <div className="section block three">
        <TitleComponent
          desc={true}
          classes="title-component--actions"
          actions={true}
        />
        <SupportActions />
      </div>
    </div>;
    }
};

Results.propTypes = {
  backgroundClasses: React.PropTypes.any,
};

export default Results;
