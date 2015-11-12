import React from 'react';

// Component
import BaseComponent from './BaseComponent';

class WhiteBorder extends BaseComponent {
  render() {
  	return  <div>
  		<div id="left"></div>
      <div id="right"></div>
      <div id="top"></div>
      <div id="bottom"></div>
    </div>;
  }
};

export default WhiteBorder;
