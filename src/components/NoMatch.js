import React from 'react';

// Components
import BaseComponent from './BaseComponent';

class NoMatch extends BaseComponent {
  render() {
  	return <div className="error">
    	Page does not exist
    </div>;
  }
};

export default NoMatch;
