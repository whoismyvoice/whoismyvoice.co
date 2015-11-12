import React from 'react';

// Components
import WhiteBorder from './WhiteBorder';
import BaseComponent from './BaseComponent';

class NoMatch extends BaseComponent {
  render() {
  	return <div className="error">
  		<WhiteBorder />
    	Page does not exist
    </div>;
  }
};

export default NoMatch;
