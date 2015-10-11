import React from 'react';
import { Link } from 'react-router';

// Components
import Button from './Button';
import Circle from './Circle';
import SearchInput from './SearchInput';
import SenateStore from '../stores/SenateStore';
import SenateActions from '../actions/SenateActions';

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
    return (
      <div className="block">
      <Circle desc="Did my Senator co-sponsor the bill to defund Planned Parenthood?" />
        <h3>Home</h3>
        <SearchInput /><br /><br />

        <Button text="Go to About page" link="/About" /><br />
      </div>
    );
  }
});

export default Home;
