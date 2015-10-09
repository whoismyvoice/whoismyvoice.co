import React from 'react';
import { Link } from 'react-router';

// Components
import Button from './Button';
import Circle from './Circle';
import SearchInput from './SearchInput';

// Styles
import style from './../styles/Home.scss';

const Home = React.createClass({
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
