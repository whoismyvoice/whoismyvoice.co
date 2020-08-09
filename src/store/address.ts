import { Draft, produce } from 'immer';
import { Action, ActionType } from '../actions/types';

export interface AddressState {
  readonly value?: string;
  readonly street?: string;
  readonly zipCode?: string;
  readonly latitude?: string;
  readonly longitude?: string;
}

const initialState: AddressState = {
  value: undefined,
  street: undefined,
  zipCode: undefined,
  latitude: undefined,
  longitude: undefined,
};

const handler = produce((draft: Draft<AddressState>, action: Action) => {
  switch (action.type) {
    case ActionType.RECEIVE_ADDRESS:
      if (draft.zipCode === undefined) {
        throw new Error('Can not receive street address when zipCode not set.');
      }
      draft.street = action.address.replace(
        new RegExp(`(, )?${draft.zipCode}`),
        ''
      );
      draft.value = action.address;
      break;
    case ActionType.RECEIVE_GPS:
      draft.latitude = action.latitude;
      draft.longitude = action.longitude;
      break;
    case ActionType.RECEIVE_ZIP_CODE:
      draft.zipCode = action.zipCode;
      break;
    case ActionType.RESET_CURRENT:
      draft.latitude = undefined;
      draft.longitude = undefined;
      draft.street = undefined;
      draft.value = undefined;
      draft.zipCode = undefined;
      break;
  }
}, initialState);

export default handler;
