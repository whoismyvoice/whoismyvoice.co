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

    const NUMBER_REPRESENTATIVES = this.state.number_representatives,
          REPRESENTATIVES = this.state.representatives,
          DID_SEARCH = this.state.did_search,
          ERROR = this.state.error,
          ZIP_CODE = this.state.zip_code,
          CURRENT_MEMBER = this.state.current_senator,
          STATE = this.state.state_full,
          MEMBER_STATUS_THIRD = SenateConstants.CHAMBER === 'house' ? 'Congressmen' : 'Senators';

    let impact = SenateConstants.IMPACT_PRE_GENDER + ' these people ' + SenateConstants.IMPACT_POST_GENDER,
        VOTE_STATUS = ' from ' + STATE + ' co-sponsored the bill to defund Planned Parenthood';

    if(DID_SEARCH && NUMBER_REPRESENTATIVES === 1) {
      const MEMBER_THIRD = REPRESENTATIVES[0].gender_full === 'man' ? 'He' : 'She';
      impact = SenateConstants.IMPACT_PRE_GENDER +' this '+ REPRESENTATIVES[0].gender_full +' '+ SenateConstants.IMPACT_POST_GENDER;
      VOTE_STATUS = 'co-sponsored a bill to defund Planned Parenthood. ' + MEMBER_THIRD + ' represents your voice!';
    }

    if (DID_SEARCH) {
      this._initializeFullpage();
    } else {
      VOTE_STATUS = 'You have not yet searched for a member';
    }

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
