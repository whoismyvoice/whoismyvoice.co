import React from 'react';
import { Link } from 'react-router';

const Sources = React.createClass({
  render() {
    return  <div className="block">
      <h1>Sources</h1>
      <p>You just routed to the sources page from Home.</p>
      <Link to="/">
        <button className="p1 about">Go back</button>
      </Link>
    </div>;
  }
});

export default Sources;