import {
  RECEIVE_CONTRIBUTION_DATA,
} from '../actions/types';

const initialState = {
  byName: {},
};

function handleByName(state, action) {
  const { type, } = action;
  switch (type) {
    case RECEIVE_CONTRIBUTION_DATA:
      const { legislatorId, amount, } = action;
      return {
        ...state,
        [legislatorId]: amount,
      };
    default:
      return state;
  }
}

function handle(state = initialState, action) {
  const { type, } = action;
  switch (type) {
    case RECEIVE_CONTRIBUTION_DATA:
      return {
        ...state,
        byName: handleByName(state.byName, action),
      };
    default:
      return state;
  }
}

export default handle;