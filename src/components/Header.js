import React from 'react'
import { Link } from 'react-router'
import Button from './Button'
import cx from 'classnames'

// Styles
import style from './../styles/Header.scss';

const Header = React.createClass({
  getInitialState() {
    return {
      didClick: false
    };
  },

  _handleClick: function(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.setState({didClick: !this.state.didClick});
  },

  render() {
    // Change classes for burger-icon and navigation based on whether onClick has been fired
    let iconClasses = cx(
      ['burger-icon'],
      {'is-active': this.state.didClick}
    );

    let menuClasses = cx(
      ['navigation'],
      {'is-active': this.state.didClick}
    );

    return <div className="header">
      <div className="menu">

        <div className="burger-wrapper" onClick={this._handleClick}>
          <div className={iconClasses}></div>
        </div>

        <nav className={menuClasses} onClick={this._handleClick}>
          <div className="black-line menu">
          </div>

          <Button
            link="/sources"
            text="Data Sources"
          />

          <Button
            link="/about"
            text="About This project"
          />

          <Button
            link="/hfc"
            text="House Freedom Caucus"
          />

          <Button
            link="/"
            flush={true}
            text="Start Again"
          />
          <div className="arrowDown nav-arrow"></div>
        </nav>
      </div>
    </div>;
  }
});

export default Header;
