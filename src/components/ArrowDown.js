import React from 'react';
import cx from 'classnames';

// Component
import ContainerActions from '../actions/ContainerActions.js';

// Styles
import style from './../styles/ArrowDown.scss';

const ArrowDown = React.createClass({

  _handleClick: function(event) {
    event.preventDefault();
    event.stopPropagation();
  	// Listen for event.target.id in order to decipher which of the arrows was tapped
  	ContainerActions.setCurrentMember(event.target.id);
    $.fn.fullpage.moveSectionDown();
  },

  _handleScroll: function() {
    let y = $(window).scrollTop();
    $('html, body').animate({scrollTop: y + $(window).height()}, 600);
  },

  render() {
  	const arrowClasses = cx(
      ['arrowDown'],
      {'hide': this.props.additional && !this.props.double},
      {'sticky': this.props.scroll},
      {'single': !this.props.additional},
      {'double': this.props.additional}
    );

    const color = this.props.color;

    if (this.props.scroll) {
      return <div className={arrowClasses +' '+ color} onClick={this._handleScroll}>
        </div>;
    } else {
      return <div className={arrowClasses +' '+ color} id={this.props.id} onClick={this._handleClick}>
        </div>;
      }
    }
});

export default ArrowDown;
