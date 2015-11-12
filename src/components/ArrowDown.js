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
    const y = $(window).scrollTop();
    $('html, body').animate({scrollTop: y + $(window).height()}, 600);
  },

  render() {

    const {id, scroll} = this.props;

    const arrowClasses = cx(
      ['arrowDown'],
      {'sticky': this.props.scroll}
    );

    const color = this.props.color;

    if (scroll) {
      return <div className={arrowClasses + ' ' + color} onClick={this._handleScroll}>
      </div>;
    } else {
      return <div className={arrowClasses + ' ' + color} id={id} onClick={this._handleClick}>
      </div>;
    }
  }
});

ArrowDown.propTypes = {
  color: React.PropTypes.string,
  id: React.PropTypes.number,
  scroll: React.PropTypes.string
}

export default ArrowDown;
