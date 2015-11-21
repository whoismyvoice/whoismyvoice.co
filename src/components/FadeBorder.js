import React from 'react';
import cx from 'classnames';

// Component
import BaseComponent from './BaseComponent';

class FadeBorder extends BaseComponent {
  render() {

    const leftClasses = cx(
      [''],
      {'darken': this.props.darken}
    );

  	return  <div>
  		<div id="left-blur" className={leftClasses}></div>
      <div id="right-blur" className={leftClasses}></div>
    </div>;
  }
};

export default FadeBorder;
