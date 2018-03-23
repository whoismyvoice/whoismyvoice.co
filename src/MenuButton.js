// @flow

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import cx from 'classnames';

import { toggleMenu, reset } from './actions';
// Styles
import './styles/MenuButton.css';

import type { Dispatch } from './actions';
import type { State } from './store';

type Props = {
  didSearch: boolean,
  isMenuOpen: boolean,
  onMenuButtonClick: Function,
  onMenuLinkClick: Function,
  onRestartClick: Function,
};

export class MenuButton extends Component<Props> {
  static defaultProps = {
    isMenuOpen: false,
    onMenuButtonClick: () => {},
  };

  static propTypes = {
    didSearch: PropTypes.bool,
    isMenuOpen: PropTypes.bool,
    onMenuButtonClick: PropTypes.func,
    onMenuLinkClick: PropTypes.func,
    onRestartClick: PropTypes.func,
  };

  render() {
    const {
      didSearch,
      isMenuOpen,
      onMenuButtonClick,
      onMenuLinkClick,
      onRestartClick,
    } = this.props;
    const menuClasses = cx(['menu-overlay'], {
      'menu-overlay--show': isMenuOpen && didSearch,
      'menu-overlay--white': isMenuOpen && !didSearch,
    });
    const buttonClasses = cx(['menu-buttons', 'animated'], {
      bounceInRight: isMenuOpen,
      bounceOutRight: !isMenuOpen,
      'menu-buttons--white': !didSearch,
    });
    const menuButtonClasses = cx(['menu-button', 'animated'], {
      'menu-button--clicked': isMenuOpen,
    });

    return (
      <Fragment>
        <div className={menuClasses}>
          <div className="menu-container">
            <Link
              to="/sources"
              className={buttonClasses}
              onClick={onMenuLinkClick}
            >
              Data sources
            </Link>
            <Link
              to="/about"
              className={buttonClasses}
              onClick={onMenuLinkClick}
            >
              About this project
            </Link>
            <Link to="/" className={buttonClasses} onClick={onRestartClick}>
              Start Again
            </Link>
          </div>
        </div>
        <div className={menuButtonClasses} onClick={onMenuButtonClick} />
      </Fragment>
    );
  }
}

function mapStateToProps(state: State) {
  const { address, view } = state;
  return {
    didSearch: address.value !== undefined,
    ...view,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    onMenuButtonClick: event => {
      event.preventDefault();
      dispatch(toggleMenu());
    },
    onMenuLinkClick: event => {
      dispatch(toggleMenu());
    },
    onRestartClick: event => {
      dispatch(reset());
      dispatch(toggleMenu());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuButton);
