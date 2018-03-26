import { connect } from 'react-redux';
import {
  DispatchProps,
  Props,
  StateProps,
  Results as Component,
} from './Results';
import { reset } from '../../actions';
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
  return {
    onBack: (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      dispatch(reset());
    },
  };
}

export default connect<StateProps, DispatchProps, Props>(
  stateToProps,
  dispatchToProps
)(Results);
