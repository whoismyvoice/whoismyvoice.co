import { connect } from 'react-redux';
import {
  DispatchProps,
  Props,
  StateProps,
  Results as Component,
} from './Results';
import { reset, navigateLegislators } from '../../actions';
import { Dispatch } from '../../actions/types';
import { State } from '../../store';

export const Results = Component;

function stateToProps(state: State): StateProps {
  const { address } = state;
  return {
    didSearch: address.value !== undefined,
  };
}

function dispatchToProps(dispatch: Dispatch): DispatchProps {
  function handleNavigation(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const target = event.currentTarget;
    const href = target.href;
    if (href.endsWith('#section-0')) {
      dispatch(reset());
    } else if (href.endsWith('#section-1')) {
      dispatch(navigateLegislators(1));
    } else if (href.endsWith('#section-2')) {
      dispatch(navigateLegislators(2));
    }
  }

  return {
    onBack: (event: React.MouseEvent<HTMLAnchorElement>) => {
      handleNavigation(event);
    },
    onNext: (event: React.MouseEvent<HTMLAnchorElement>) => {
      handleNavigation(event);
    },
  };
}

export default connect<StateProps, DispatchProps, Props>(
  stateToProps,
  dispatchToProps
)(Results);
