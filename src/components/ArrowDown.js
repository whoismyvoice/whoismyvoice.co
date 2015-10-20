import React from 'react'

// Styles
import style from './../styles/ArrowDown.scss';

const ArrowDown = React.createClass({
  
  _handleClick: function(event) {
    $.fn.fullpage.moveSectionDown();
  },

  render() {
  	return <div className="arrowDown" onClick={this._handleClick}>
    </div>;
  }
});

export default ArrowDown;
