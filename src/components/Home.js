import React from 'react';
import { Link } from 'react-router';
import SenateStore from '../stores/SenateStore';
import SenateActions from '../actions/SenateActions';

// Components
import Button from './Button';
import Circle from './Circle';
import SearchInput from './SearchInput';
import SenatorImg from './SenatorImg';

// Styles
import style from './../styles/Home.scss';

const Home = React.createClass({
  getInitialState: function() {
    return SenateStore.getMember();
  },

  componentDidMount: function() {
    SenateStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    SenateStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(SenateStore.getMember());
  },

  render() {
    var member_name = this.state.member_name,
        member_bioguide = this.state.member_bioguide,
        member_zip_code = this.state.member_zip_code,
        member_age = this.state.member_age,
        member_gender = this.state.member_gender === 'M' ? 'man' : 'woman',
        voted_for = this.state.voted_for,
        vote_status;

    if(voted_for) {
      vote_status = 'Yes! Your Senator, a ' + member_age + ' old ' + member_gender + ' co-sponsored a bill to defund Planned Parenthood. This '+ member_gender + ' represents your voice!';
    } else {
      vote_status = 'No! Your Senator did not co-sponsor a bill to defund Planned Parenthood.'
    }

    return (
      <div className="container">
        <div className="block">
          <Circle desc="Did my Senator co-sponsor the bill to defund Planned Parenthood?" />
          <h3>Home</h3>
          <SearchInput /><br /><br />
        </div>
        <div className="block">
          <Circle desc={vote_status} />
          <SenatorImg bioguide={member_bioguide} />
          <h3>Senator {member_name}</h3>
          <h3>{member_age} years old</h3>
        </div>
      </div>
    );
  }
});

export default Home;
