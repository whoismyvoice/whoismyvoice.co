import {
  RECEIVE_ADDRESS,
  RECEIVE_GPS,
  RECEIVE_ZIP_CODE,
  RESET_CURRENT,
} from '../actions/types';

const initialState = {
  value: undefined,
  street: undefined,
  zipCode: undefined,
  latitude: undefined,
  longitude: undefined,
};

function handle(state = initialState, action) {
  const { type } = action;
  switch (type) {
    case RECEIVE_ADDRESS:
      return {
        ...state,
        street: action.address.replace(new RegExp(`(, )?${state.zipCode}`), ''),
        value: action.address,
      };
    case RECEIVE_GPS:
      return {
        ...state,
        latitude: action.latitude,
        longitude: action.longitude,
      };
    case RECEIVE_ZIP_CODE:
      return {
        ...state,
        zipCode: action.zipCode,
      };
    case RESET_CURRENT:
      return initialState;
    default:
      return state;
  }
}

export default handle;
