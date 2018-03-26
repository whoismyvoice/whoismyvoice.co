import { Action, ActionType } from '../actions/types';

export type ViewState = {
  addressErrorMessage?: string;
  isMenuOpen: boolean;
};

const initialState = {
  addressErrorMessage: undefined,
  isMenuOpen: false,
};

function handle(state: ViewState = initialState, action: Action): ViewState {
  switch (action.type) {
    case ActionType.RECEIVE_OFFICIALS:
      return {
        ...state,
        addressErrorMessage: undefined,
      };
    case ActionType.RECEIVE_OFFICIALS_ERROR:
      return {
        ...state,
        addressErrorMessage: action.error.message,
      };
    case ActionType.TOGGLE_MENU:
      return {
        ...state,
        isMenuOpen: !state.isMenuOpen,
      };
    default:
      return state;
  }
}

export default handle;
