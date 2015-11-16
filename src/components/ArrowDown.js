import React from 'react';
import cx from 'classnames';

// Components
import ContainerActions from '../actions/ContainerActions.js';
import BaseComponent from './BaseComponent';

// Styles
import style from './../styles/ArrowDown.scss';

class ArrowDown extends BaseComponent {
  constructor() {
    super();
    this._bind('_handleClick', '_handleScroll');
  }

  _handleClick(event) {
    event.preventDefault();
    event.stopPropagation();
  	// Listen for event.target.id in order to decipher which of the arrows was tapped
  	ContainerActions.setCurrentMember(event.target.id);
    $.fn.fullpage.moveSectionDown();
  }
  _handleScroll() {
    const y = $(window).scrollTop();
    $('html, body').animate({scrollTop: y + $(window).height()}, 600);
  }
  render() {
    const {id, scroll, color} = this.props;
    const arrowClasses = cx(
      ['arrowDown'],
      {'sticky': scroll}
    );

    if (scroll) {
      return <div className={arrowClasses + ' ' + color} onClick={this._handleScroll}>
      </div>;
    } else {
      return <div className={arrowClasses + ' ' + color} id={id} onClick={this._handleClick}>
      </div>;
    }
  }
};

ArrowDown.propTypes = {
  color: React.PropTypes.string,
  id: React.PropTypes.number,
  scroll: React.PropTypes.string
}

export default ArrowDown;
