import React from 'react';
import SenateStore from '../stores/SenateStore';
import Settings from '../data/settings.json';

import DataUtils from '../utils/DataUtils';
import ContainerActions from '../actions/ContainerActions';
import cx from 'classnames';
import Results from './Results';

// Components
import BaseComponent from './BaseComponent';
import Circle from './Circle';
import SearchGroup from './SearchGroup';
import CongressmanGroup from './Senator/CongressmanGroup';
import WhiteBorder from './WhiteBorder';

// Styles
import style from './../styles/Home.scss';

class Home extends BaseComponent {
  constructor() {
    super();
    this._bind('_handleChange', '_initializeFullpage', '_destroyFullpage');
    this.state = SenateStore.getMember();
  }

  componentDidMount() {
    if (this.state.did_search) {
      this._initializeFullpage();
    }
    if (process.env.NODE_ENV === 'production' && this.state.settings === null) {
      DataUtils.saveFetchedData();
    }
    SenateStore.addChangeListener(this._handleChange);
  }

  componentWillUnmount() {
    SenateStore.removeChangeListener(this._handleChange);
    this._destroyFullpage();
  }

  _handleChange() {
    this.setState(SenateStore.getMember());
  }

  _initializeFullpage () {
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
      onLeave: (index, nextIndex) => {
        ContainerActions.identifySection(nextIndex);
      }
    });
  }
  _destroyFullpage() {
    if ($.fn.fullpage.destroy !== undefined) {
      $.fn.fullpage.destroy('all');
    }
  }
  render() {
    const NUMBER_REPRESENTATIVES = this.state.number_representatives,
          SETTINGS = this.state.settings,
          REPRESENTATIVES = this.state.representatives,
          DID_SEARCH = this.state.did_search,
          ERROR = this.state.error,
          ZIP_CODE = this.state.zip_code,
          STATE_FULL = this.state.state_full,
          CURRENT_MEMBER = this.state.current_senator,
          {single_voted_for, single_voted_against} = SETTINGS ? SETTINGS.house : Settings.house,
          {cosponsor_post_text, impact_text, represent} = SETTINGS ? SETTINGS.senate : Settings.senate,
          {chamber, bill_desc} = SETTINGS ? SETTINGS : Settings,
          MEMBER = chamber === 'senate' ? 'senator' : 'representative';

    let impact = impact_text.replace('#gender_third', 'this person'),
        VOTE_STATUS = `${cosponsor_post_text}`;

    if (DID_SEARCH && NUMBER_REPRESENTATIVES === 1 && chamber === 'house') {
      const MEMBER_THIRD = REPRESENTATIVES[0].gender_full === 'man' ? 'He' : 'She',
            represent_text = represent.replace('#gender', MEMBER_THIRD);

      impact = impact_text.replace('#gender_third', `this ${REPRESENTATIVES[0].gender_full}`);
      VOTE_STATUS = REPRESENTATIVES[0].voted === 'Yea' ? ` ${single_voted_for} ${represent_text}` : ` ${single_voted_against} ${represent_text}`;

    } else if (DID_SEARCH && NUMBER_REPRESENTATIVES === 1 && chamber === 'senate'){
      VOTE_STATUS = REPRESENTATIVES[0].voted === 'Yea' ? ` ${cosponsor_post_text}` : '';
    }

    if (DID_SEARCH && NUMBER_REPRESENTATIVES === 1 && chamber === 'house' || DID_SEARCH && NUMBER_REPRESENTATIVES > 0 && chamber === 'senate') {
      this._initializeFullpage();
    } else {
      VOTE_STATUS = 'You have not yet searched for a member';
      this._destroyFullpage();
    }

    const blockClasses = cx(
      ['block', 'one'],
      {'hide': DID_SEARCH && NUMBER_REPRESENTATIVES === 1 && chamber === 'house' || DID_SEARCH && NUMBER_REPRESENTATIVES > 0 && chamber === 'senate'},
    );

    const backgroundClasses = cx(
      ['second-wrapper'],
      {'move-up': DID_SEARCH},
      {'static': !DID_SEARCH}
    );

    const sectionClasses = cx(
      ['section-block'],
      {'hide': NUMBER_REPRESENTATIVES === 1 || chamber === 'senate'}
    );

    const containerClasses = cx(
      ['container'],
      {'reveal': DID_SEARCH},
      {'green': !DID_SEARCH || NUMBER_REPRESENTATIVES > 1 || NUMBER_REPRESENTATIVES === undefined},
      {'orange': DID_SEARCH && NUMBER_REPRESENTATIVES !== 0 && NUMBER_REPRESENTATIVES !== undefined},
      {'red': DID_SEARCH && NUMBER_REPRESENTATIVES === 0 && chamber === 'senate'},
      {'visible': DID_SEARCH && NUMBER_REPRESENTATIVES === 0 && chamber === 'senate'},
      {'purple': this.state.current_screen === 2},
      {'full': DID_SEARCH}
    );

    return <div className={containerClasses}>
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
          	desc={bill_desc.replace('#member', MEMBER)}
        	/>
        	<SearchGroup
            repNum={NUMBER_REPRESENTATIVES}
          	error={ERROR}
            did_search={DID_SEARCH}
            zip_code={ZIP_CODE}
            state_full={STATE_FULL}
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
};

export default Home;
