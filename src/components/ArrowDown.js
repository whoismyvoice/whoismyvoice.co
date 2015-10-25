import React from 'react'
import cx from 'classnames'

// Component
import ContainerActions from '../actions/ContainerActions.js'

// Styles
import style from './../styles/ArrowDown.scss';

const ArrowDown = React.createClass({

  _handleClick: function(event) {
  	// Listen for event.target.id in order to decipher which of the arrows was tapped
  	ContainerActions.setCurrentMember(event.target.id);
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
