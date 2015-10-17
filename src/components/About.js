import React from 'react';
import { Link } from 'react-router';

const About = React.createClass({
  render() {
    return <div className="block">
      <h1>About</h1>
      <p>You just routed to the about page from Home.</p>
      <Link to="/">
        <button className="p1 about">Go back</button>
      </Link>
    </div>;
  }
});

export default About;
