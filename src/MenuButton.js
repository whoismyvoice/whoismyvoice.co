import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import { Link, } from 'react-router-dom';
import { connect, } from 'react-redux';
import cx from 'classnames';

import {
  toggleMenu,
} from './actions';
// Styles
import './styles/MenuButton.css';

export class MenuButton extends Component {
  static defaultProps = {
    isMenuOpen: false,
    onMenuButtonClick: () => {},
  }

  static propTypes = {
    isMenuOpen: PropTypes.bool,
    onMenuButtonClick: PropTypes.func,
  }

  handleClick(event) {

  }

  handleRestart(event) {

  }

  render() {
    const {
      didSearch,
      isMenuOpen,
      onMenuButtonClick,
    } = this.props;
    const menuClasses = cx(
      [ 'menu-overlay', ],
      {
        'menu-overlay--show': isMenuOpen && didSearch,
        'menu-overlay--white': isMenuOpen && !didSearch,
      },
    );
    const buttonClasses = cx(
      [ 'menu-buttons', 'animated', ],
      {
        'bounceInRight': isMenuOpen,
        'bounceOutRight': !isMenuOpen,
        'menu-buttons--white': !didSearch,
      },
    );
    const menuButtonClasses = cx(
      [ 'menu-button', 'animated', ],
      {
        'menu-button--clicked': isMenuOpen,
      },
    );

    return (
    <React.Fragment>
      <div className={menuClasses}>
        <div className="menu-container">
          <Link to="/sources" className={buttonClasses}>
            Data sources
          </Link>
          <Link to="/about" className={buttonClasses}>
            About this project
          </Link>
          <Link to="/" className={buttonClasses}>
            Start Again
          </Link>
        </div>
      </div>
      <div
        className={menuButtonClasses}
        onClick={onMenuButtonClick}
      >
      </div>
    </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  const { address, view, } = state;
  return {
    didSearch: address.value !== undefined,
    ...view,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onMenuButtonClick: (event) => {
      event.preventDefault();
      dispatch(toggleMenu());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuButton);
