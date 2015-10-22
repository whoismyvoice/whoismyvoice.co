import React from 'react';
import { Link } from 'react-router';

const Senators = React.createClass({
  render() {
    return  <div className="page-block blue">
    	<h2>About the House Freedom Caucus</h2>
      <p className="pageIntroduction">
      	Meet the members of the House Freedom Caucus. The HFC is a group of 40+ conservative congressmen who have publicly declared they will oppose any spending bill that does not defund Planned Parenthood.<br /><br /> 
		Yes, these men and women are willing to shut down your government over this issue. <span className="strike-out">If you live in their district</span>, email them. If you don’t, tweet at them.
      </p>
    </div>;
  }
});

export default Senators;
