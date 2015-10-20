import React from 'react'
import { Link } from 'react-router'
import SenateStore from '../stores/SenateStore'
import SenateActions from '../actions/SenateActions'
import ContainerActions from '../actions/ContainerActions'
import cx from 'classnames'

// Components
import Button from './Button'
import Circle from './Circle'
import SearchInput from './SearchInput'
import SenatorImg from './Senator/SenatorImg'
import SenatorName from './Senator/SenatorName'
import SupportActions from './Senator/SupportActions'
import ErrorMsg from './ErrorMsg'
import RandomButton from './Senator/RandomButton'
import ArrowDown from './ArrowDown'

// Styles
import style from './../styles/Home.scss'


const Home = React.createClass({

  getInitialState: function() {
    return SenateStore.getMember();
  },

  testfunction: function() {
    console.log("Called test");
  },

  componentDidMount: function() {
    // Allow fetching of member if id / zip_code is defined as a parameter
    // First check if member has already been fetched
    if(!this.state.did_search) {
      let params = this.props.params;

      // Check length to make sure zip is supplied
      if(params.zip && params.zip.length === 5 && !isNaN(params.zip)) {
        SenateActions.identifyMember(params.zip);
      }
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
      scrollingSpeed: 700,
      autoScrolling: true,
      fitToSection: true,
      fitToSectionDelay: 700,
      easingcss3: 'ease-in',
      loopHorizontal: false,
      touchSensitivity: 15,
      normalScrollElementTouchThreshold: 5,

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
    $.fn.fullpage.destroy();
  },

  render() {
    var LastScreen = false;

    var blockClasses = cx(
      ['block', 'one'], 
      {'hide': this.state.did_search }
    );

    var backgroundClasses = cx(
      ['second-wrapper'], 
      {'move-up': this.state.did_search },
      {'static': !this.state.did_search }
    );

    var containerClasses = cx(
      ['container'], 
      {'reveal': this.state.did_search},
      {'green': !this.state.did_search},
      {'orange': this.state.did_search && !this.state.last_screen},
      {'purple': this.state.last_screen}
    );

    var member_name = this.state.member_name,
        member_bioguide = this.state.member_bioguide,
        member_zip_code = this.state.member_zip_code,
        member_age = this.state.member_age,
        member_gender = this.state.member_gender === 'M' ? 'man' : 'woman',
        member_email = this.state.member_email,
        member_tel = this.state.member_tel,
        member_twitter = this.state.member_twitter,
        voted_for = this.state.voted_for,
        did_search = this.state.did_search,
        party = this.state.member_party,
        member_random = this.state.member_random,
        error_msg = this.state.error_msg,
        vote_status;

    let impact = 'Here are some ways you can keep this man '+ member_gender +' from being able to personally weigh in on the reproductive rights of millions of underserved women the next time a similar vote comes up.';

    if(did_search) {
      this._initializeFullpage();
      if(!member_random) {
        vote_status = 'Yes! Your Senator, a ' + member_age + ' old ' + member_gender + ' co-sponsored a bill to defund Planned Parenthood. This '+ member_gender + ' represents your voice!';
      } else {
        vote_status = 'No! Your senator does not support Planned Parenthood! But, have you heard of the House Freedom Caucus? These are the guys who have publicly declared they are willing to shut down the government over the issue of funding Planned Parenthood.';
      }
    } else {
      vote_status = 'You have not yet searched for a member';
    }
    
    return  <div className={containerClasses}>

      <div className="overlay">
        This site is only supported in portrait mode. Please turn your phone.
      </div>

      <div className={blockClasses} onScroll={this._handleScroll}>
        <div className="black-line"></div>
        <Circle
          style="one"
          desc="Did my Senator co-sponsor the bill to defund Planned Parenthood?"
        />

        <SearchInput />
        <ErrorMsg error={error_msg} />
      </div>

      <div className={backgroundClasses} id="fullpage">
      	<div className="section block two">
          <div className="black-line"></div>
          <Circle
            style="wide"
            desc={vote_status}
          />

          <SenatorImg
            bioguide={member_bioguide}
          />

          <SenatorName
            random={member_random}
            name={member_name}
            age={member_age} 
            did_search={did_search}
          />
              
          <RandomButton random={member_random} />
          <ArrowDown className="orange" />
        </div>

        <div className="section block three">
          <div className="black-line"></div>
          <Circle 
            style="wider" 
            desc={impact} 
          />

          <SupportActions 
            random={member_random} 
            gender={member_gender} 
            email={member_email} 
            tel={member_tel} 
            twitter={member_twitter}
            party={party}
          />
        </div>
      </div>
    </div>;
  }
});

export default Home;
