import React from 'react';
import { Link } from 'react-router';

// Styles
import style from './../styles/Home.scss';


const Home = React.createClass({
  render() {
    return (
      <div className="block">
        <h1>Home</h1>
        <p>Hello world!</p>
        <Link to="/About">
          <button className="p1">Go to About page</button>
        </Link>
      </div>
    );
  }
});

export default Home;
