import React from 'react';
import SenateActions from '../actions/SenateActions';
import ContainerActions from '../actions/ContainerActions';
import SenateStore from '../stores/SenateStore';
import cx from 'classnames';

// Components
import TitleComponent from './TitleComponent';
import TextButton from './Buttons/TextButton';
import SupportActions from './Member/SupportActions';
import MemberResults from './MemberResults';
import BaseComponent from './BaseComponent';

class Results extends BaseComponent {
  constructor() {
    super();
    this.state = SenateStore.getMember();
    this._bind('_handleClick', '_destroyFullpage', '_handleRestart');
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.did_search) {
      return true;
    } else {
      return false;
    }
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
  _goBack() {
    if ($.fn.fullpage) {
      $.fn.fullpage.moveSectionUp();
    }
  }
  _handleClick(event) {
    event.preventDefault();
    event.stopPropagation();
    // Listen for event.target.id in order to decipher which of the arrows was tapped
    ContainerActions.setCurrentMember(event.target.id);
    if($.fn.fullpage) {
      $.fn.fullpage.moveSectionDown();
    }
  }
	render() {
    const {
      number_representatives
    } = this.state;

    const backgroundClasses = cx(
      ['second-wrapper'],
      {'move-up': this.state.did_search}
    );

    return <div className={backgroundClasses} id="fullpage">
      <div className="section block two">
        <TextButton
          text="Back"
          onClick={this._handleRestart}
        />
        <MemberResults
          numRep={number_representatives}
        />
      </div>
      <div className="section block three">
        <TextButton
          text="Back"
          onClick={this._goBack}
        />
        <TitleComponent
          desc={true}
          classes="title-component--actions"
          actions={true}
        />
        <div className="star__seperator">
          <span>&#9733;</span>
        </div>
        <SupportActions />
      </div>
    </div>;
  }
}

Results.propTypes = {
  backgroundClasses: React.PropTypes.any
};

export default Results;
