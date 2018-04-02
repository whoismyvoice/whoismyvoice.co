import {
  receiveOfficialsError,
  toggleMenu,
  receiveOfficials,
  reset,
  navigateLegislators,
} from '../actions';
import { Action, ActionType } from '../actions/types';
import { GoogleResponseError } from '../models/GoogleResponseError';
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
    ok: true,
    status: 200,
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
  it('has an undefined current page', () => {
    expect(initialState.currentPage).toBeUndefined();
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
    const error = new GoogleResponseError(createResponse());
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

    describe('reset', () => {
      let newState = view(state, reset());
      beforeEach(() => {
        newState = view(state, reset());
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

  describe('navigateLegislators(1)', () => {
    let state = view(initialState, navigateLegislators(1));
    beforeEach(() => {
      state = view(initialState, navigateLegislators(1));
    });
    it('changes current page', async () => {
      expect(state.currentPage).toBe(1);
    });

    describe('reset', () => {
      let newState = view(state, reset());
      beforeEach(() => {
        newState = view(state, reset());
      });
      it('no longer has an error', async () => {
        expect(newState.addressErrorMessage).toBe(undefined);
      });
    });

    describe('navigateLegislators(2)', () => {
      let newState = view(initialState, navigateLegislators(2));
      beforeEach(() => {
        newState = view(initialState, navigateLegislators(2));
      });
      it('changes current page', async () => {
        expect(newState.currentPage).toBe(2);
      });

      describe('reset', () => {
        let nextState = view(newState, reset());
        beforeEach(() => {
          nextState = view(newState, reset());
        });
        it('no longer has an error', async () => {
          expect(nextState.addressErrorMessage).toBe(undefined);
        });
      });
    });
  });
});
