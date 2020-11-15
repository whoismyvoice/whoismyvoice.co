import { connect } from 'react-redux';
import { toggleMenu, reset } from '../../actions';
import { Dispatch } from '../../actions/types';
import { State } from '../../store';
import { ViewState } from '../../store/view';
import { DispatchProps, MenuButton, StateProps } from './MenuButton';

function mapStateToProps(
  state: State
): Required<StateProps> & Pick<ViewState, 'isMenuOpen'> {
  const { address, view } = state;
  return {
    didSearch: address.value !== undefined,
    ...view,
  };
}

function mapDispatchToProps(dispatch: Dispatch): Required<DispatchProps> {
  return {
    onMenuButtonClick: (event: React.MouseEvent<HTMLDivElement>): void => {
      event.preventDefault();
      dispatch(toggleMenu());
    },
    onMenuLinkClick: (): void => {
      dispatch(toggleMenu());
    },
    onRestartClick: (): void => {
      dispatch(reset());
      dispatch(toggleMenu());
    },
  };
}

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(MenuButton);
