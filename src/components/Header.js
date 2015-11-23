import React from 'react';
import Button from './Button';
import cx from 'classnames';

// Components
import BaseComponent from './BaseComponent';

// Styles
import style from './../styles/Header.scss';

class Header extends BaseComponent {
  constructor() {
    super();
    this._bind('_handleClick');
    this.state = {
      didClick: false
    }
  }

  _handleClick(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.setState({didClick: !this.state.didClick});
    $(document).scrollTop(0);
  }

  render() {
    // Change classes for burger-icon and navigation based on whether onClick has been fired
    const iconClasses = cx(
      ['burger-icon'],
      {'burger--is-active': this.state.didClick}
    );

    const menuClasses = cx(
      ['navigation'],
      {'navigation--is-active': this.state.didClick}
    );

    return <div className="header">
      <div className="navigation-menu">
        <div className="burger-wrapper" onClick={this._handleClick}>
          <div className={iconClasses}></div>
        </div>
        <nav className={menuClasses} onClick={this._handleClick}>
          <Button
            color={'white-text'}
            link="/sources"
            text="Data Sources"
          />
          <Button
            color={'white-text'}
            link="/about"
            text="About This Project"
          />
          <Button
            color={'white-text'}
            link="/hfc"
            text="House Freedom Caucus"
          />
          <Button
            color={'white-text'}
            link="/"
            flush={true}
            text="Start Again"
          />
        </nav>
      </div>
    </div>;
  }
};

export default Header;
