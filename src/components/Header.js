import React from 'react';
import Button from './Button';
import cx from 'classnames';

// Components
import WhiteBorder from './WhiteBorder';

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
    $(document).scrollTop(0);
  },

  render() {
    // Change classes for burger-icon and navigation based on whether onClick has been fired
    const iconClasses = cx(
      ['burger-icon'],
      {'is-active': this.state.didClick}
    );

    const menuClasses = cx(
      ['navigation'],
      {'is-active': this.state.didClick}
    );

    return <div className="header">
      <div className="menu">

        <div className="burger-wrapper" onClick={this._handleClick}>
          <div className={iconClasses}></div>
        </div>

        <nav className={menuClasses} onClick={this._handleClick}>
          <WhiteBorder />

          <Button
            color={'yellow-text'}
            link="/sources"
            text="Data Sources"
          />

          <Button
            color={'yellow-text'}
            link="/about"
            text="About This Project"
          />

          <Button
            color={'yellow-text'}
            link="/hfc"
            text="House Freedom Caucus"
          />

          <Button
            color={'yellow-text'}
            link="/"
            flush={true}
            text="Start Again"
          />
          <div className="arrowDown yellow-text nav-arrow"></div>
        </nav>
      </div>
    </div>;
  }
});

export default Header;
