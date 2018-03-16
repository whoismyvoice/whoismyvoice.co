import {
  RECEIVE_OFFICIALS,
  RECEIVE_OFFICIALS_ERROR,
  TOGGLE_MENU,
} from '../actions/types';

const initialState = {
  addressErrorMessage: undefined,
  isMenuOpen: false,
};

function handle(state = initialState, action) {
  const { type } = action;
  switch (type) {
    case RECEIVE_OFFICIALS:
      return {
        ...state,
        addressErrorMessage: undefined,
      };
    case RECEIVE_OFFICIALS_ERROR:
      return {
        ...state,
        addressErrorMessage: action.error.message,
      };
    case TOGGLE_MENU:
      return {
        ...state,
        isMenuOpen: !state.isMenuOpen,
      };
    default:
      return state;
  }
}

export default handle;
