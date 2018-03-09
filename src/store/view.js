import {
  TOGGLE_MENU,
} from '../actions/types';

const initialState = {
  isMenuOpen: false,
};

function handle(state = initialState, action) {
  const { type, } = action;
  switch (type) {
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
