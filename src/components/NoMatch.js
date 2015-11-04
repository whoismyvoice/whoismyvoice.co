import React from 'react';
import WhiteBorder from './WhiteBorder';

const NoMatch = React.createClass({
  render() {
  	return <div className="error">
  		<WhiteBorder />
    	Page does not exist
    </div>;
  }
});

export default NoMatch;
