import {
  receiveOfficialsError,
  toggleMenu,
  receiveOfficials,
} from '../actions';
import { Action, ActionType } from '../actions/types';
import { ResponseError } from '../models/ResponseError';
import view from './view';

jest.mock('mixpanel-browser');

function action(): Action {
  return {
    type: ActionType.OTHER,
  };
}

function createResponse() {
  return {
    json: () => {
      return Promise.resolve({
        error: { message: 'foo' },
      });
    },
  };
}

describe('initial state', () => {
  const initialState = view(undefined, action());
  it('provides an initial state when given undefined', () => {
    expect(initialState).toBeDefined();
  });
  it('has the menu closed in initial state', () => {
    expect(initialState.isMenuOpen).toBe(false);
  });
  it('has an undefined address error message', () => {
    expect(initialState.addressErrorMessage).toBe(undefined);
  });

  describe('toggleMenu', () => {
    const state = view(initialState, toggleMenu());
    it('opens the menu', () => {
      expect(state.isMenuOpen).toBe(true);
    });
  });

  describe('receiveOfficialsError', () => {
    let receiveOfficialsErrorAction = undefined;
    let state = initialState;
    const error = new ResponseError(createResponse());
    beforeEach(async () => {
      receiveOfficialsErrorAction = await receiveOfficialsError(error);
      state = view(initialState, receiveOfficialsErrorAction);
    });
    it('has an error', async () => {
      expect(state.addressErrorMessage).toBe('foo');
    });

    describe('receiveOfficials', () => {
      let newState = view(state, receiveOfficials([]));
      beforeEach(() => {
        newState = view(state, receiveOfficials([]));
      });
      it('no longer has an error', async () => {
        expect(newState.addressErrorMessage).toBe(undefined);
      });
    });
  });

  describe('receiveOfficials', () => {
    let state = view(initialState, receiveOfficials([]));
    beforeEach(() => {
      state = view(initialState, receiveOfficials([]));
    });
    it('does not change address error message', async () => {
      expect(state.addressErrorMessage).toBe(undefined);
    });
  });
});
