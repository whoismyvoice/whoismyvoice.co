import React, { VFC } from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import { ViewState } from '../../store/view';
// Styles
import '../../styles/MenuButton.scss';

export interface StateProps {
  didSearch?: boolean;
}

export interface DispatchProps {
  onMenuButtonClick?: React.MouseEventHandler;
  onMenuLinkClick?: React.MouseEventHandler;
  onRestartClick?: React.MouseEventHandler;
}

type Props = StateProps &
  DispatchProps &
  Partial<Pick<ViewState, 'isMenuOpen'>>;

export const MenuButton: VFC<Props> = (props) => {
  const {
    didSearch = false,
    isMenuOpen = false,
    onMenuButtonClick = () => void 0,
    onMenuLinkClick = () => void 0,
    onRestartClick = () => void 0,
  } = props;
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
      <div className={menuClasses} data-testid="menu-overlay">
        <div className="menu-container">
          <Link
            to="/sources"
            className={buttonClasses}
            onClick={onMenuLinkClick}
          >
            Data sources
          </Link>
          <Link to="/about" className={buttonClasses} onClick={onMenuLinkClick}>
            About this project
          </Link>
          <Link to="/" className={buttonClasses} onClick={onRestartClick}>
            Home
          </Link>
        </div>
      </div>
      <div
        className={menuButtonClasses}
        onClick={onMenuButtonClick}
        data-testid="menu-button"
      />
    </React.Fragment>
  );
};
