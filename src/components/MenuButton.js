import React from 'react';
import { Link } from 'react-router';
import cx from 'classnames';
import SenateStore from '../stores/SenateStore';

// Components
import BaseComponent from './BaseComponent';
import TextButton from './Buttons/TextButton';

// Styles
import style from '../styles/MenuButton.scss';

class MenuButton extends BaseComponent {
  constructor() {
    super();
    this._bind('_toggleOverlay', '_handleChange');
    this.state = SenateStore.getMember();
  }

  componentDidMount() {
    SenateStore.addChangeListener(this._handleChange);
  }
  componentWillUnmount() {
    SenateStore.removeChangeListener(this._handleChange);
  }
  _handleChange() {
    this.setState(SenateStore.getMember());
  }

  _toggleOverlay(evt) {
    this.setState({didClick: !this.state.didClick});
  }

  render() {

  const menuClasses = cx(
    ['menu-overlay'],
    {'menu-overlay--show': this.state.didClick && this.state.did_search},
    {'menu-overlay--white': this.state.didClick && !this.state.did_search}
  );

  const buttonClasses = cx(
    ['menu-buttons', 'animated'],
    {'fadeIn': this.state.didClick},
    {'fadeOut': !this.state.didClick},
    {'menu-buttons--white': !this.state.did_search}
  );

  const menuButtonClasses = cx(
    ['menu-button', 'animated'],
    {'menu-button--clicked': this.state.didClick}
  );

  	return <span>
      <div className={menuClasses}>
        <div className="menu-container">
          <Link to="/sources">
            <div className={buttonClasses} onClick={this._toggleOverlay}>
              Data sources
            </div>
          </Link>
          <Link to="/about">
            <div className={buttonClasses} onClick={this._toggleOverlay}>
              About this project
            </div>
          </Link>
          <Link to="/">
            <div className={buttonClasses} onClick={this._toggleOverlay}>
              Start Again
            </div>
          </Link>
        </div>
      </div>
      <div
        className={menuButtonClasses}
        onClick={this._toggleOverlay}
      >
      </div>
    </span>;
  }
}

export default MenuButton;
