import React from 'react';
import { Link } from 'react-router';
import ContainerActions from '../../actions/ContainerActions';

// Component
import BaseComponent from '../BaseComponent';

// Styles
import style from '../../styles/TextButton.scss';

class NavButton extends BaseComponent {
  constructor() {
    super();
    this._bind('_handleClick');
  }

  _handleClick(event) {
    ContainerActions.setCurrentMember(event.target.id);
    $.fn.fullpage.moveSectionDown();
  }

  render() {
    const {text, id} = this.props;
    return <a className="text-button" id={id} onClick={this._handleClick}>
      <span id={id}>{text}</span>
      <div id={id} className="text-button-border">
      </div>
  	</a>;
  }
}

export default NavButton;
