import React from 'react';
import { Link } from 'react-router';
import cx from 'classnames';
import SenateStore from '../stores/SenateStore';
import SenateActions from '../actions/SenateActions';

// Components
import BaseComponent from './BaseComponent';

// Styles
import style from '../styles/MenuButton.scss';

class MenuButton extends BaseComponent {
  constructor() {
    super();
    this._bind('_toggleOverlay', '_handleChange', '_destroyFullpage', '_handleRestart');
    this.state = SenateStore.getMember();
  }

  _handleRestart() {
    this.setState({didClick: !this.state.didClick});
    SenateActions.flush();
    this._destroyFullpage();
  }
  _destroyFullpage() {
    if ($.fn.fullpage.destroy !== undefined) {
      $.fn.fullpage.destroy();
    }
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

  _toggleOverlay() {
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
      {'bounceInRight': this.state.didClick},
      {'bounceOutRight': !this.state.didClick},
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
            <div className={buttonClasses} onClick={this._handleRestart}>
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
