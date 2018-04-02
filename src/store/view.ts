import { Action, ActionType } from '../actions/types';

export type ViewState = {
  addressErrorMessage?: string;
  currentPage?: 1 | 2;
  isMenuOpen: boolean;
};

const initialState = {
  addressErrorMessage: undefined,
  currentPage: undefined,
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
        addressErrorMessage: action.message,
      };
    case ActionType.RECEIVE_PAGE:
      return {
        ...state,
        currentPage: action.page,
      };
    case ActionType.RESET_CURRENT:
      return {
        ...state,
        addressErrorMessage: undefined,
        currentPage: undefined,
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
