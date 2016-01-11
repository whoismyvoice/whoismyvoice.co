import React from 'react';
import SenateStore from '../stores/SenateStore';
import cx from 'classnames';

// Components
import BaseComponent from './BaseComponent';
import SearchGroup from './Search/SearchGroup';
import Results from './Results';
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
    SenateStore.addChangeListener(this._handleChange);
  }

  componentWillUnmount() {
    SenateStore.removeChangeListener(this._handleChange);
    this._destroyFullpage();
  }

  _handleChange() {
    this.setState(SenateStore.getMember());
  }

  // Function to initialize fullPage
  _initializeFullpage() {
    if (!this.state.initialized) {
      this.setState({
        initialized: true
      });
      $('#fullpage').fullpage({
        navigation: false,
        lockAnchors: true,
        showActiveTooltip: false,
        slidesNavigation: false,
        css3: true,
        autoScrolling: true,
        fitToSection: true,
        fitToSectionDelay: 1000,
        easingcss3: 'ease-in',
        loopHorizontal: false,
        keyboardScrolling: false,
        animateAnchor: false,
        recordHistory: false,
        controlArrows: false,
        verticalCentered: false,
        touchSensitivity: 2,
        scrollingSpeed: 900,
        resize: true
      });
    }
  }

  // Function to destroy fullpage
  _destroyFullpage() {
    if (this.state.initialized) {
      if ($.fn.fullpage.destroy !== undefined) {
        $.fn.fullpage.destroy('all');
      }
      this.setState({
        initialized: false
      });
    }
  }

  render() {
    const NUMBER_REPRESENTATIVES = this.state.number_representatives,
      NUMBER_HOUSE = this.state.number_house,
      DID_SEARCH = this.state.did_search;

    // When search has been initiated and the right number of reps are retrieved initialize fullPage
    if (DID_SEARCH && NUMBER_HOUSE === 1 && NUMBER_REPRESENTATIVES === 3) {
      this._initializeFullpage();
    } else {
      this._destroyFullpage();
    }

    const blockClasses = cx(
      ['block', 'block--margin'],
      {'disappear': DID_SEARCH && NUMBER_HOUSE === 1 && NUMBER_REPRESENTATIVES > 2},
    );

    const fadingClasses = cx(
      ['fading-circle'],
      {'orange-bg': DID_SEARCH && NUMBER_HOUSE === 1 && NUMBER_REPRESENTATIVES > 2}
    );

    const containerClasses = cx(
      ['container'],
      {'reveal': DID_SEARCH},
      {'full': DID_SEARCH && NUMBER_HOUSE === 1 && NUMBER_REPRESENTATIVES > 2}
    );

    return <div className={containerClasses}>
      <div className={fadingClasses}></div>
      <div className="overlay">
        This site is only supported in portrait mode. Please turn your phone.
      </div>
      <div className={blockClasses}>
      	<div className="section-block">
          <TitleComponent
            front={true}
            classes="title-component--padding"
            desc={true}
          />
        	<SearchGroup />
        </div>
        <Results destroy={this._destroyFullpage} />
      </div>
    </div>;
  }
}

export default Home;
