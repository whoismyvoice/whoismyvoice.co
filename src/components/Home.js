import React from 'react';
import SenateStore from '../stores/SenateStore';
import SenateConstants from '../constants/SenateConstants';

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

    return  SenateStore.getMember()
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
    const blockClasses = cx(
      ['block', 'one'],
      {'hide': this.state.did_search}
    );

    const backgroundClasses = cx(
      ['second-wrapper'],
      {'move-up': this.state.did_search},
      {'static': !this.state.did_search}
    );

    const containerClasses = cx(
      ['container'],
      {'reveal': this.state.did_search},
      {'green': !this.state.did_search},
      {'orange': this.state.did_search},
      {'purple': this.state.current_screen === 2},
      {'full': this.state.did_search}
    );

    const MEMBER_NAME = this.state.member_name,
          MEMBER_BIOGUIDE = this.state.member_bioguide,
          MEMBER_GENDER = this.state.member_gender,
          MEMBER_THIRD = MEMBER_GENDER === 'man' ? 'He' : 'She',
          MEMBER_STATE_FULL = this.state.member_state_full,
          DID_SEARCH = this.state.did_search,
          ERROR = this.state.error,
          MEMBER_ZIP_CODE = this.state.member_zip_code,
          CURRENT_MEMBER = this.state.current_senator,
          NUMBER_REPRESENTATIVES = this.state.number_representatives || null,
          REPRESENTATIVES = this.state.representatives || null,
          MEMBER_STATUS_THIRD = SenateConstants.CHAMBER === 'house' ? 'Congressmen' : 'Senators';

    let VOTE_STATUS;

    if (DID_SEARCH) {
      this._initializeFullpage();
      VOTE_STATUS = NUMBER_REPRESENTATIVES === 1 ? 'co-sponsored a bill to defund Planned Parenthood. ' + MEMBER_THIRD + ' represents your voice!' : ' from ' + MEMBER_STATE_FULL + ' co-sponsored the bill to defund Planned Parenthood';
    } else {
      VOTE_STATUS = 'You have not yet searched for a member';
    }

    const impact = NUMBER_REPRESENTATIVES > 1 ? SenateConstants.IMPACT_PRE_GENDER + ' these people ' + SenateConstants.IMPACT_POST_GENDER : SenateConstants.IMPACT_PRE_GENDER +' this '+ MEMBER_GENDER +' '+ SenateConstants.IMPACT_POST_GENDER;

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
          	desc={SenateConstants.BILL_DESC+'?'}
        	/>

        	<SearchGroup
            repNum={NUMBER_REPRESENTATIVES}
          	error={ERROR}
            zip_code={MEMBER_ZIP_CODE}
        	/>
        </div>

        <Results
          representatives={REPRESENTATIVES}
          numRep={NUMBER_REPRESENTATIVES}
          backgroundClasses={backgroundClasses}
          vote_status={VOTE_STATUS}
          bioguide={MEMBER_BIOGUIDE}
          impact={impact}
          current_member={CURRENT_MEMBER}
          zip_code={MEMBER_ZIP_CODE}
        />
      </div>
    </div>;
  }
});

export default Home;
