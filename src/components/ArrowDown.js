import React from 'react'
import cx from 'classnames'

// Component
import ArrowActions from '../actions/ArrowActions.js'

// Styles
import style from './../styles/ArrowDown.scss';

const ArrowDown = React.createClass({

  _handleClick: function(event) {
  	// Listen for event.target.id in order to decipher which of the arrows was tapped
  	ArrowActions.setCurrentMember(event.target.id);
    $.fn.fullpage.moveSectionDown();
  },

  render() {
  	let arrowClasses = cx(
      ['arrowDown'],
      {'hide': this.props.additional}
    );

  	return <div className={arrowClasses} id={this.props.id} onClick={this._handleClick}>
    	</div>;
  	}
});

export default ArrowDown;
