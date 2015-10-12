import React from 'react';
import { Link } from 'react-router';
import SenateStore from '../stores/SenateStore';
import SenateActions from '../actions/SenateActions';

// Components
import Button from './Button';
import Circle from './Circle';
import SearchInput from './SearchInput';
import SenatorImg from './SenatorImg';
import SenatorName from './SenatorName';
import SupportActions from './SupportActions';

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
        member_email = this.state.member_email,
        member_tel = this.state.member_tel,
        member_twitter = this.state.member_twitter,
        voted_for = this.state.voted_for,
        member_random = this.state.member_random,
        vote_status,
        impact;

    impact = 'How you can directly impact keeping this '+ member_gender +' from being able to personally weigh in on the reproductive rights of millions of women this '+ member_gender +' has never met, the next time a similar vote comes up.';

    if(!member_random) {
      vote_status = 'Yes! Your Senator, a ' + member_age + ' old ' + member_gender + ' co-sponsored a bill to defund Planned Parenthood. This '+ member_gender + ' represents your voice!';
    } else {
      vote_status = 'No! So great for you! But here is a winning member of the House of Freedom Caucus we would like to introduce you to. The House Freedom Caucus has publicly declared they are willing to shut down the government over the issue of funding Planned Parenthood.';
    }

    return (
      <div className="container">

        <div className="block">
          <Circle desc="Did my Senator co-sponsor the bill to defund Planned Parenthood?" />
          <SearchInput /><br /><br />
        </div>

        <div className="block">
          <Circle style="wide" desc={vote_status} />
          <SenatorImg bioguide={member_bioguide} />
          <SenatorName name={member_name} age={member_age} />
        </div>

        <div className="block">
          <Circle style="wider" desc={impact} />
          <SupportActions gender={member_gender} email={member_email} tel={member_tel} twitter={member_twitter} />
        </div>

      </div>
    );
  }
});

export default Home;
