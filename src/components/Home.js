import React from 'react'
import { Link } from 'react-router'
import SenateStore from '../stores/SenateStore'
import SenateActions from '../actions/SenateActions'
import ContainerActions from '../actions/ContainerActions'
import {abbrState} from '../utils/StateConverter'
import cx from 'classnames'
import Results from './Results'

// Components
import Button from './Button'
import Circle from './Circle'
import SearchInput from './SearchInput'
import SenatorGroup from './Senator/SenatorGroup'
import SupportActions from './Senator/SupportActions'
import ErrorMsg from './ErrorMsg'
import ArrowDown from './ArrowDown'
import HFCOverview from './HFCOverview'

// Styles
import style from './../styles/Home.scss'

const Home = React.createClass({

  getInitialState: function() {
    return  SenateStore.getMember()
  },

  componentDidMount: function() {

    // Allow fetching of member if id / zip_code is defined as a parameter
    //if(!this.state.did_search) {
    //  let params = this.props.params;
    //  if(params.zip && params.zip.length === 5 && !isNaN(params.zip)) {
    //    SenateActions.identifyMember(params.zip);
    //  }
    //}

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
      //Navigation
      navigation: false,
      showActiveTooltip: false,
      slidesNavigation: false,

      //Scrolling
      css3: true,
      autoScrolling: true,
      fitToSection: true,
      easingcss3: 'ease-in',
      loopHorizontal: false,

      //Accessibility
      keyboardScrolling: false,
      animateAnchor: true,
      recordHistory: true,

      //Design
      controlArrows: false,
      verticalCentered: false,
      resize : true,

      onLeave: function(index, nextIndex, direction){
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
    let blockClasses = cx(
      ['block', 'one'], 
      {'hide': this.state.did_search }
    );

    let backgroundClasses = cx(
      ['second-wrapper'], 
      {'move-up': this.state.did_search },
      {'static': !this.state.did_search },
      {'short': this.state.member_hfc}
    );

    let containerClasses = cx(
      ['container'], 
      {'reveal': this.state.did_search},
      {'green': !this.state.did_search},
      {'orange': this.state.did_search && !this.state.member_hfc},
      {'purple': this.state.current_screen === 2 && !this.state.member_hfc},
      {'bright-red': this.state.did_search && this.state.member_hfc},
      {'full': this.state.did_search && this.state.member_hfc}
    );

    let MEMBER_NAME = this.state.member_name,
        MEMBER_BIOGUIDE = this.state.member_bioguide,
        MEMBER_ZIP_CODE = this.state.member_zip_code,
        MEMBER_AGE = this.state.member_age,
        MEMBER_GENDER = this.state.member_gender === 'M' ? 'man' : 'woman',
        MEMBER_THIRD = MEMBER_GENDER === 'man' ? 'He' : 'She',
        MEMBER_EMAIL = this.state.member_email,
        MEMBER_TEL = this.state.member_tel,
        MEMBER_TWITTER = this.state.member_twitter,
        MEMBER_STATE = this.state.member_state,
        MEMBER_STATE_FULL = this.state.member_state_full,
        DID_SEARCH = this.state.did_search,
        PARTY = this.state.member_party,
        MEMBER_HFC = this.state.member_hfc,
        ERROR_MSG = this.state.error_msg,
        ADDITIONAL_MEMBER = this.state.additional_member,
        ADDITIONALEXISTS = ADDITIONAL_MEMBER !== null,
        CURRENT_MEMBER = this.state.current_senator,
        VOTE_STATUS;

    let impact = 'Here are some ways you can keep this ' + MEMBER_GENDER + ' from being able to personally weigh in on the reproductive rights of millions of underserved women the next time a similar vote comes up.';

    if (DID_SEARCH && !MEMBER_HFC) {
      this._initializeFullpage();
      VOTE_STATUS = ADDITIONAL_MEMBER === null ? 'co-sponsored a bill to defund Planned Parenthood. ' + MEMBER_THIRD + ' represents your voice!' : 'Both senators from ' + MEMBER_STATE_FULL + ' co-sponsored the bill to defund Planned Parenthood';
    } else {
      VOTE_STATUS = 'You have not yet searched for a member';
    }
    // NOT RANDOM
    return  <div className={containerClasses}>
      <div className="overlay">
        This site is only supported in portrait mode. Please turn your phone.
      </div>

      <div className={blockClasses} onScroll={this._handleScroll}>
        <div className="black-line"></div>

        <Circle
          style="one"
          hide={true}
          did_search={DID_SEARCH}
          desc="Did my Senator co-sponsor the bill to defund Planned Parenthood?"
        />

        <SearchInput />
        <ErrorMsg error={ERROR_MSG} />

        <Results
          hfc={MEMBER_HFC}
          backgroundClasses={backgroundClasses}
          additional_member={ADDITIONAL_MEMBER}
          age={MEMBER_AGE}
          did_search={DID_SEARCH}
          gender={MEMBER_GENDER}
          vote_status={VOTE_STATUS}
          bioguide={MEMBER_BIOGUIDE}
          name={MEMBER_NAME}
          state={MEMBER_STATE}
          impact={impact}
          additional_exists={ADDITIONALEXISTS}
          current_member={CURRENT_MEMBER}
          email={MEMBER_EMAIL}
          tel={MEMBER_TEL}
          twitter={MEMBER_TWITTER}
          party={PARTY}
        />
      </div>
    </div>;
  }
});

export default Home;
