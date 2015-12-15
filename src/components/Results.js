import React from 'react';
import SenateActions from '../actions/SenateActions';
import ContainerActions from '../actions/ContainerActions';
import SenateStore from '../stores/SenateStore';
import cx from 'classnames';

// Components
import TextButton from './Buttons/TextButton';
import MemberResults from './MemberResults';
import BaseComponent from './BaseComponent';
import SupportActions from './member/SupportActions';

class Results extends BaseComponent {
  constructor() {
    super();
    this.state = SenateStore.getMember();
    this._bind('_handleClick', '_handleRestart');
  }

  // Check if component should update, and update only if user did search
  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.did_search) {
      return true;
    } else {
      return false;
    }
  }

  // Function to restart application and set did_search inside SenateStore() to false
  _handleRestart() {
    SenateActions.flush();
    this.props.destroy();
  }

  // Function to make fullPage move up one section
  _goBack() {
    if ($.fn.fullpage) {
      $.fn.fullpage.moveSectionUp();
    }
  }

  // Function to select specific member based on target.id
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
      number_representatives,
      representatives,
      number_house
    } = this.state;

    const backgroundClasses = cx(
      ['second-wrapper'],
      {'move-up': this.state.did_search}
    );

    let first_rep,
      second_third,
      testMap;

    // Check if representatives exist and that they have the correct numer of members
    if (representatives && number_representatives > 2 && number_house === 1) {
      // Assign member values to three diff. vars to ensure fullPage support (vs. dynamic rendering)
      first_rep = representatives.slice(0, 1);
      second_third = representatives.slice(1, 3);
    }

    return <div className={backgroundClasses} id="fullpage">
      {testMap}
      <div className="section block two">
        <TextButton
          text="Back"
          onClick={this._handleRestart}
        />
        <MemberResults
          numRep={number_representatives}
          representative={first_rep}
        />
      </div>
      <div className="section block two">
        <TextButton
          text="Back"
          onClick={this._goBack}
        />
        <MemberResults
          numRep={number_representatives}
          representative={second_third}
        />
      </div>
      <div className="section block threee">
        <TextButton
          text="Back"
          onClick={this._goBack}
        />
        <SupportActions />
      </div>
    </div>;
  }
}

Results.propTypes = {
  backgroundClasses: React.PropTypes.any
};

export default Results;
