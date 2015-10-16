import React from 'react';
import { Link } from 'react-router';

const Senators = React.createClass({
  render() {
    return (
      <div className="block">
        <h1>Senators</h1>
        <p>You just routed to the senators page from Home.</p>
        <Link to="/">
          <button className="p1 about">Go back</button>
        </Link>
      </div>
    );
  }
});

export default Senators;
