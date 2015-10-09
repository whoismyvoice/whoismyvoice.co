import React from 'react';
import { Link } from 'react-router';

// Components
import Button from './Button';

// Styles
import style from './../styles/Home.scss';

const Home = React.createClass({
  render() {
    return (
      <div className="block">
        <h1>Home</h1>
        <p>Hello world!</p>
        <Button text="Go to About page" link="/About" />
      </div>
    );
  }
});

export default Home;
