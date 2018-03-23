// @flow

import {
  RECEIVE_ADDRESS,
  RECEIVE_GPS,
  RECEIVE_ZIP_CODE,
  RESET_CURRENT,
} from '../actions/types';

import type { Action } from '../actions/types';

type UninitializedString = string | void;

export type AddressState = {
  value: UninitializedString,
  street: UninitializedString,
  zipCode: UninitializedString,
  latitude: UninitializedString,
  longitude: UninitializedString,
};

const initialState = {
  value: undefined,
  street: undefined,
  zipCode: undefined,
  latitude: undefined,
  longitude: undefined,
};

function handle(state: AddressState = initialState, action: Action) {
  const { type } = action;
  switch (type) {
    case RECEIVE_ADDRESS:
      if (state.zipCode === undefined) {
        throw new Error('Can not receive street address when zipCode not set.');
      }
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
