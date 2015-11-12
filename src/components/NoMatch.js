import React from 'react';
import WhiteBorder from './WhiteBorder';

class NoMatch extends React.Component {
  render() {
  	return <div className="error">
  		<WhiteBorder />
    	Page does not exist
    </div>;
  }
};

export default NoMatch;
