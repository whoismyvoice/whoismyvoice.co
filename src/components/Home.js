import React from 'react';
import SenateStore from '../stores/SenateStore';
import Settings from '../data/settings.json';

import ContainerActions from '../actions/ContainerActions';
import cx from 'classnames';
import Results from './Results';

// Components
import Circle from './Circle';
import SearchGroup from './SearchGroup';
import WhiteBorder from './WhiteBorder';

// Styles
import style from './../styles/Home.scss';

const Home = React.createClass({
  getInitialState: function() {
    return  SenateStore.getMember();
  },
  componentDidMount: function() {
    if (this.state.did_search && !this.state.member_hfc) {
      this._initializeFullpage();
    } else {
      this._destroyFullpage();
    }
    SenateStore.addChangeListener(this._handleChange);
  },
  componentWillUnmount: function() {
    SenateStore.removeChangeListener(this._handleChange);
    this._destroyFullpage();
  },
  _handleChange: function() {
    this.setState(SenateStore.getMember());
  },
  _initializeFullpage: function() {
    $('#fullpage').fullpage({
      navigation: false,
      showActiveTooltip: false,
      slidesNavigation: false,
      css3: true,
      autoScrolling: true,
      fitToSection: true,
      easingcss3: 'ease-in',
      loopHorizontal: false,
      keyboardScrolling: false,
      animateAnchor: true,
      recordHistory: true,
      controlArrows: false,
      verticalCentered: false,
      resize: true,
      onLeave: function(index, nextIndex) {
        ContainerActions.identifySection(nextIndex);
      }
    });
  },
  _destroyFullpage: function() {
    if ($.fn.fullpage.destroy !== undefined) {
      $.fn.fullpage.destroy('all');
    }
  },
  render() {
    const NUMBER_REPRESENTATIVES = this.state.number_representatives,
          REPRESENTATIVES = this.state.representatives,
          DID_SEARCH = this.state.did_search,
          ERROR = this.state.error,
          ZIP_CODE = this.state.zip_code,
          CURRENT_MEMBER = this.state.current_senator,
          SECOND_SEARCH = this.state.second_search;

    let impact = Settings.senate.impact_text.replace('#gender_third', 'this person'),
        VOTE_STATUS = `${Settings.senate.cosponsor_post_text}`;

    if (DID_SEARCH && NUMBER_REPRESENTATIVES === 1 && Settings.chamber === 'house') {

      const MEMBER_THIRD = REPRESENTATIVES[0].gender_full === 'man' ? 'He' : 'She',
            represent = Settings.senate.represent.replace('#gender', MEMBER_THIRD);
      impact = Settings.senate.impact_text.replace('#gender_third', `this ${REPRESENTATIVES[0].gender_full}`);

      VOTE_STATUS = REPRESENTATIVES[0].voted === 'Yea' ? ` ${Settings.house.single_voted_for} ${represent}` : ` ${Settings.house.single_voted_against} ${represent}`;

    } else if (DID_SEARCH && NUMBER_REPRESENTATIVES === 1 && Settings.chamber === 'senate'){

      VOTE_STATUS = REPRESENTATIVES[0].voted === 'Yea' ? ` ${Settings.senate.cosponsor_post_text}` : '';

    }

    if (DID_SEARCH && NUMBER_REPRESENTATIVES !== 0) {
      this._initializeFullpage();
    } else {
      VOTE_STATUS = 'You have not yet searched for a member';
    }

    const blockClasses = cx(
      ['block', 'one'],
      {'hide': DID_SEARCH}
    );

    const backgroundClasses = cx(
      ['second-wrapper'],
      {'move-up': DID_SEARCH},
      {'static': !DID_SEARCH}
    );

    const containerClasses = cx(
      ['container'],
      {'reveal': DID_SEARCH},
      {'green': !DID_SEARCH},
      {'orange': DID_SEARCH && NUMBER_REPRESENTATIVES !== 0},
      {'red': DID_SEARCH && NUMBER_REPRESENTATIVES === 0 && Settings.chamber === 'senate'},
      {'visible': DID_SEARCH && NUMBER_REPRESENTATIVES === 0 && Settings.chamber === 'senate'},
      {'purple': this.state.current_screen === 2},
      {'full': DID_SEARCH}
    );

    return  <div className={containerClasses}>
      <WhiteBorder />
      <div className="overlay">
        This site is only supported in portrait mode. Please turn your phone.
      </div>
      <div className={blockClasses} onScroll={this._handleScroll}>
      	<div className="section-block">
        	<Circle
          	style="one"
          	hide={true}
          	did_search={DID_SEARCH}
          	desc={Settings.bill_desc + '?'}
        	/>
        	<SearchGroup
            repNum={NUMBER_REPRESENTATIVES}
          	error={ERROR}
            zip_code={ZIP_CODE}
        	/>
        </div>
        <Results
          representatives={REPRESENTATIVES}
          numRep={NUMBER_REPRESENTATIVES}
          backgroundClasses={backgroundClasses}
          vote_status={VOTE_STATUS}
          impact={impact}
          current_member={CURRENT_MEMBER}
          zip_code={ZIP_CODE}
        />
      </div>
    </div>;
  }
});

export default Home;
