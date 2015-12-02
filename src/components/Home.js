import React from 'react';
import SenateStore from '../stores/SenateStore';
import Settings from '../data/settings.json';
import DataUtils from '../utils/DataUtils';
import ContainerActions from '../actions/ContainerActions';
import cx from 'classnames';

// Components
import BaseComponent from './BaseComponent';
import SearchGroup from './SearchGroup';
import Results from './Results';
import FadeBorder from './FadeBorder';
import TitleComponent from './TitleComponent';

// Styles
import style from './../styles/Home.scss';

class Home extends BaseComponent {
  constructor(props) {
    super(props);
    this._bind('_handleChange', '_initializeFullpage', '_destroyFullpage');
    this.state = SenateStore.getMember();
  }

  componentDidMount() {
    if (this.state.did_search) {
      this._initializeFullpage();
    }
    if (process.env.NODE_ENV === 'production' && this.state.settings === null) {
      //DataUtils.saveFetchedData();
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

  _initializeFullpage() {
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
    let ts;

    $(document).bind('touchstart', function(e) {
      ts = e.originalEvent.touches[0].clientY;
    });

    $(document).bind('touchend', function(e) {
      let te = e.originalEvent.changedTouches[0].clientY;

      if (ts > te + 5){
        $.fn.fullpage.moveSectionDown();
      }
    });
  }

  render() {
    const NUMBER_REPRESENTATIVES = this.state.number_representatives,
      SETTINGS = this.state.settings,
      DID_SEARCH = this.state.did_search,
      {chamber} = SETTINGS ? SETTINGS : Settings;

    if (DID_SEARCH && NUMBER_REPRESENTATIVES === 1 && chamber === 'house' || DID_SEARCH && NUMBER_REPRESENTATIVES > 0 && chamber === 'senate') {
      this._initializeFullpage();
    } else {
      this._destroyFullpage();
    }

    const blockClasses = cx(
      ['block', 'block--margin'],
      {'disappear': DID_SEARCH && NUMBER_REPRESENTATIVES === 1 && chamber === 'house' || DID_SEARCH && NUMBER_REPRESENTATIVES > 0 && chamber === 'senate'},
    );

    const backgroundClasses = cx(
      ['second-wrapper'],
      {'move-up': DID_SEARCH},
      {'static': !DID_SEARCH}
    );

    const containerClasses = cx(
      ['container'],
      {'reveal': DID_SEARCH},
      {'light-color': !DID_SEARCH || NUMBER_REPRESENTATIVES > 1 && chamber === 'house' || NUMBER_REPRESENTATIVES === undefined},
      {'peach-color': DID_SEARCH && NUMBER_REPRESENTATIVES !== 0 && NUMBER_REPRESENTATIVES !== undefined},
      {'visible': DID_SEARCH && NUMBER_REPRESENTATIVES === 0 && chamber === 'senate'},
      {'dark-orange-color': this.state.current_screen === 2},
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
            front={true}
            classes="title-component--padding"
            desc={true}
          />
        	<SearchGroup />
        </div>
        <Results
          backgroundClasses={backgroundClasses}
        />
      </div>
    </div>;
  }
}

export default Home;
