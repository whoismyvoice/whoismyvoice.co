import { Action, ActionType } from '../actions/types';

export type AddressState = {
  value?: string;
  street?: string;
  zipCode?: string;
  latitude?: string;
  longitude?: string;
};

const initialState = {
  value: undefined,
  street: undefined,
  zipCode: undefined,
  latitude: undefined,
  longitude: undefined,
};

function handle(state: AddressState = initialState, action: Action) {
  switch (action.type) {
    case ActionType.RECEIVE_ADDRESS:
      if (state.zipCode === undefined) {
        throw new Error('Can not receive street address when zipCode not set.');
      }
      return {
        ...state,
        street: action.address.replace(new RegExp(`(, )?${state.zipCode}`), ''),
        value: action.address,
      };
    case ActionType.RECEIVE_GPS:
      return {
        ...state,
        latitude: action.latitude,
        longitude: action.longitude,
      };
    case ActionType.RECEIVE_ZIP_CODE:
      return {
        ...state,
        zipCode: action.zipCode,
      };
    case ActionType.RESET_CURRENT:
      return initialState;
    default:
      return state;
  }
}

export default handle;
