import React, { Component, } from 'react';
import { Link, } from 'react-router-dom';
import cx from 'classnames';

// Styles
import './styles/MenuButton.css';

class MenuButton extends Component {
  handleClick(event) {

  }

  handleRestart(event) {

  }

  render() {
    const { didClick, didSearch, } = this.props;
    const menuClasses = cx(
      ['menu-overlay'],
      {'menu-overlay--show': didClick && didSearch},
      {'menu-overlay--white': didClick && !didSearch}
    );

    const buttonClasses = cx(
      ['menu-buttons', 'animated'],
      {'bounceInRight': didClick},
      {'bounceOutRight': !didClick},
      {'menu-buttons--white': !didSearch}
    );

    const menuButtonClasses = cx(
      ['menu-button', 'animated'],
      {'menu-button--clicked': didClick}
    );

    return <span>
      <div className={menuClasses}>
        <div className="menu-container">
          <Link to="/sources">
            <div className={buttonClasses} onClick={this.handleClick}>
              Data sources
            </div>
          </Link>
          <Link to="/about">
            <div className={buttonClasses} onClick={this.handleClick}>
              About this project
            </div>
          </Link>
          <Link to="/">
            <div className={buttonClasses} onClick={this.handleRestart}>
              Start Again
            </div>
          </Link>
        </div>
      </div>
      <div
        className={menuButtonClasses}
        onClick={this.handleClick}
      >
      </div>
    </span>;
  }
}

export default MenuButton;