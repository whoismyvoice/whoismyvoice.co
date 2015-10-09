import React from 'react';
import { Link } from 'react-router';
import Button from './Button';
import cx from 'classnames';

// Styles
import style from './../styles/Header.scss';

const Header = React.createClass({
  getInitialState() {
    return {
      didClick: false
    };
  },
  render() {

    var iconClasses = cx(
      ['burger-icon'], 
      {'is-active': this.state.didClick }
    );

    var menuClasses = cx(
      ['navigation'],
      {'is-active': this.state.didClick }
    );

    return (
      <div className="header">
        <div className="menu">
          <div className="burger-wrapper" onClick={this._toggleMenu}>
            <div className={iconClasses}></div>
          </div>
          <nav className={menuClasses}>
            <Button link="#" text="Data Sources" />
            <Button link="#" text="About this project" />
            <Button link="#" text="See All Senators" />
            <Button link="#" text="Start Again" />
          </nav>
        </div>
      </div>
    );
  },
  _toggleMenu: function(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.setState({ didClick: !this.state.didClick });
  },
});

export default Header;
