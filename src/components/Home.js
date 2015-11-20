import React from 'react';
import SenateStore from '../stores/SenateStore';
import Settings from '../data/settings.json';

import DataUtils from '../utils/DataUtils';
import ContainerActions from '../actions/ContainerActions';
import cx from 'classnames';

// Components
import BaseComponent from './BaseComponent';
import SearchGroup from './SearchGroup';
import CongressmanGroup from './Senator/CongressmanGroup';
import Results from './Results';
import FadeBorder from './FadeBorder';
import TitleComponent from './TitleComponent';

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
      touchSensitivity: 2,
      resize: true,
      onLeave: (index, nextIndex) => {
        ContainerActions.identifySection(nextIndex);
      }
    });
    this._detectScroll();
  }
  _destroyFullpage() {
    if ($.fn.fullpage.destroy !== undefined) {
      $.fn.fullpage.destroy('all');
    }
  }
  _detectScroll() {
    const current = this.state.current_screen;
    var ts;

    $(document).bind('touchstart', function (e){
      ts = e.originalEvent.touches[0].clientY;
    });

    $(document).bind('touchend', function (e){
      var te = e.originalEvent.changedTouches[0].clientY;
      if(ts > te+5){
        $.fn.fullpage.moveSectionDown();
      }
    });
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
      {chamber, bill_desc, voted_for, voted_against, impact_text, pre_text} = SETTINGS ? SETTINGS : Settings;

    let vote_status,
        member_name = '',
        impact = impact_text.replace('#gender_third', 'this person'),
        member = chamber === 'senate' ? 'Senator': 'Representative',
        member_single = chamber === 'senate' ? 'Senator': 'Representative',
        action = chamber === 'senate' ? 'co-sponsored' : 'voted to';

    if (DID_SEARCH && NUMBER_REPRESENTATIVES === 1) {
      impact = impact_text.replace('#gender_third', `this ${REPRESENTATIVES[0].gender_full}`);
      member_name = REPRESENTATIVES[0].full_name;
    } else if (DID_SEARCH && NUMBER_REPRESENTATIVES > 1) {
      member = chamber === 'senate' ? 'Senators' : 'Representatives';
    }

    if(DID_SEARCH && NUMBER_REPRESENTATIVES > 0) {
      vote_status = REPRESENTATIVES[0].voted === 'Yea' ? ` ${voted_for}` : ` ${voted_against}`;
    }

    const RESULT = pre_text.replace('#member_type', member).replace('#member_name', member_name).replace('#action', action);

    if (DID_SEARCH && NUMBER_REPRESENTATIVES === 1 && chamber === 'house' || DID_SEARCH && NUMBER_REPRESENTATIVES > 0 && chamber === 'senate') {
      this._initializeFullpage();
    } else {
      vote_status = 'You have not yet searched for a member';
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
      {'light': !DID_SEARCH || NUMBER_REPRESENTATIVES > 1 || NUMBER_REPRESENTATIVES === undefined},
      {'peach': DID_SEARCH && NUMBER_REPRESENTATIVES !== 0 && NUMBER_REPRESENTATIVES !== undefined},
      {'visible': DID_SEARCH && NUMBER_REPRESENTATIVES === 0 && chamber === 'senate'},
      {'purple': this.state.current_screen === 2},
      {'full': DID_SEARCH && NUMBER_REPRESENTATIVES === 1 && chamber === 'house' || DID_SEARCH && chamber === 'senate'}
    );

    return <div className={containerClasses}>
      <FadeBorder
        darken={DID_SEARCH}
      />
      <div className="overlay">
        This site is only supported in portrait mode. Please turn your phone.
      </div>
      <div className={blockClasses} onScroll={this._handleScroll}>
      	<div className="section-block">
          <TitleComponent
            did_search={DID_SEARCH}
            number_representatives={NUMBER_REPRESENTATIVES}
            vote_status={vote_status}
            pre_text={RESULT}
            desc={bill_desc.replace('#member', member_single)}
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
          pre_text={RESULT}
          vote_status={vote_status}
          impact={impact}
          chamber={chamber}
          did_search={DID_SEARCH}
          current_member={CURRENT_MEMBER}
          zip_code={ZIP_CODE}
        />
      </div>
    </div>;
  }
};

export default Home;
