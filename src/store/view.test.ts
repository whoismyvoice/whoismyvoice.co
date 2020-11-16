import {
  receiveOfficesError,
  toggleMenu,
  receiveAddress,
  receiveOffices,
  receiveZipCode,
  reset,
  navigateLegislators,
  receiveZipCodeInvalid,
} from '../actions';
import { Action, ActionType } from '../actions/types';
import { GoogleResponseError } from '../models/GoogleResponseError';
import view, { ViewState } from './view';

function action(): Action {
  return {
    type: ActionType.OTHER,
  };
}

function createResponse(): Response {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error not a full Response object
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
      receiveOfficialsErrorAction = await receiveOfficesError(error);
      state = view(initialState, receiveOfficialsErrorAction);
    });
    it('has an error', () => {
      expect(state.addressErrorMessage).toBe('foo');
    });

    describe('receiveOffices', () => {
      let newState = view(state, receiveOffices([]));
      beforeEach(() => {
        newState = view(state, receiveOffices([]));
      });
      it('no longer has an error', () => {
        expect(newState.addressErrorMessage).toBe(undefined);
      });
    });

    describe('reset', () => {
      let newState = view(state, reset());
      beforeEach(() => {
        newState = view(state, reset());
      });
      it('no longer has an error', () => {
        expect(newState.addressErrorMessage).toBe(undefined);
      });
    });
  });

  describe('receiveOffices', () => {
    let state = view(initialState, receiveOffices([]));
    beforeEach(() => {
      state = view(initialState, receiveOffices([]));
    });
    it('does not change address error message', () => {
      expect(state.addressErrorMessage).toBe(undefined);
    });
  });

  describe('navigateLegislators(1)', () => {
    let state = view(initialState, navigateLegislators(1));
    beforeEach(() => {
      state = view(initialState, navigateLegislators(1));
    });
    it('changes current page', () => {
      expect(state.currentPage).toBe(1);
    });

    describe('reset', () => {
      let newState = view(state, reset());
      beforeEach(() => {
        newState = view(state, reset());
      });
      it('no longer has an error', () => {
        expect(newState.addressErrorMessage).toBe(undefined);
      });
    });

    describe('navigateLegislators(2)', () => {
      let newState = view(initialState, navigateLegislators(2));
      beforeEach(() => {
        newState = view(initialState, navigateLegislators(2));
      });
      it('changes current page', () => {
        expect(newState.currentPage).toBe(2);
      });

      describe('reset', () => {
        let nextState = view(newState, reset());
        beforeEach(() => {
          nextState = view(newState, reset());
        });
        it('no longer has an error', () => {
          expect(nextState.addressErrorMessage).toBe(undefined);
        });
      });
    });
  });

  describe('ZipCodeInvalid', () => {
    let state: ViewState;
    beforeEach(() => {
      state = view(initialState, receiveZipCodeInvalid());
    });
    it('has an address error message', () => {
      expect(state.addressErrorMessage).toBeDefined();
    });
    it('has an address error message string', () => {
      expect(state.addressErrorMessage).toMatchSnapshot();
    });
    describe('receiveZipCode', () => {
      beforeEach(() => {
        state = view(state, receiveZipCode('12345'));
      });
      it('has address error message cleared', () => {
        expect(state.addressErrorMessage).toBeUndefined();
      });
    });
    describe('receiveAddress', () => {
      beforeEach(() => {
        state = view(state, receiveAddress('12345'));
      });
      it('has address error message cleared', () => {
        expect(state.addressErrorMessage).toBeUndefined();
      });
    });
  });
});
