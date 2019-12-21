import React from 'react';
import { Link } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import cx from 'classnames';

import { toggleMenu, reset } from '../../actions';
import { Dispatch } from '../../actions/types';
import { State } from '../../store';
import { ViewState } from '../../store/view';
// Styles
import '../../styles/MenuButton.scss';

function mapStateToProps(state: State): StateProps & ViewState {
  const { address, view } = state;
  return {
    didSearch: address.value !== undefined,
    ...view,
  };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    onMenuButtonClick: (event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      dispatch(toggleMenu());
    },
    onMenuLinkClick: (event: React.MouseEvent<HTMLAnchorElement>) => {
      dispatch(toggleMenu());
    },
    onRestartClick: (event: React.MouseEvent<HTMLAnchorElement>) => {
      dispatch(reset());
      dispatch(toggleMenu());
    },
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type MappedProps = ConnectedProps<typeof connector>;

interface StateProps {
  didSearch?: boolean;
}

interface DispatchProps {
  onMenuButtonClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onMenuLinkClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  onRestartClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}

export class MenuButton extends React.Component<MappedProps> {
  static defaultProps = {
    didSearch: false,
    isMenuOpen: false,
    onMenuButtonClick: () => undefined,
    onMenuLinkClick: () => undefined,
    onRestartClick: () => undefined,
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
      <React.Fragment>
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
      </React.Fragment>
    );
  }
}

export default connector(MenuButton);
