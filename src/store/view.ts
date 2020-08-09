import { Draft, produce } from 'immer';
import { Action, ActionType } from '../actions/types';

export interface ViewState {
  readonly addressErrorMessage?: string;
  readonly currentPage?: 1 | 2;
  readonly isMenuOpen: boolean;
}

const initialState: ViewState = {
  addressErrorMessage: undefined,
  currentPage: undefined,
  isMenuOpen: false,
};

const handler = produce((draft: Draft<ViewState>, action: Action) => {
  switch (action.type) {
    case ActionType.RECEIVE_ADDRESS: // Intentional fall through
    case ActionType.RECEIVE_ZIP_CODE: // Intentional fall through
    case ActionType.RECEIVE_OFFICES:
      draft.addressErrorMessage = undefined;
      break;
    case ActionType.RECEIVE_OFFICES_ERROR:
      draft.addressErrorMessage = action.message;
      break;
    case ActionType.RECEIVE_PAGE:
      draft.currentPage = action.page;
      break;
    case ActionType.RESET_CURRENT:
      draft.addressErrorMessage = undefined;
      draft.currentPage = undefined;
      break;
    case ActionType.TOGGLE_MENU:
      draft.isMenuOpen = !draft.isMenuOpen;
      break;
    case ActionType.RECEIVE_ZIP_CODE_INVALID:
      draft.addressErrorMessage = 'Valid zip code is required.';
      break;
  }
}, initialState);

export default handler;
