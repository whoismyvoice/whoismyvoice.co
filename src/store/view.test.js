import {
  receiveOfficialsError,
  toggleMenu,
  receiveOfficials,
} from '../actions';
import view from './view';

jest.mock('mixpanel-browser');

describe('initial state', () => {
  const initialState = view(undefined, {});
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
    const error = {
      response: {
        json: () => {
          return Promise.resolve({
            error: { message: 'foo' },
          });
        },
      },
    };
    beforeEach(async () => {
      receiveOfficialsErrorAction = await receiveOfficialsError(error);
      state = view(initialState, receiveOfficialsErrorAction);
    });
    it('has an error', async () => {
      expect(state.addressErrorMessage).toBe('foo');
    });

    describe('receiveOfficials', () => {
      let newState = undefined;
      beforeEach(() => {
        newState = view(state, receiveOfficials([]));
      });
      it('no longer has an error', async () => {
        expect(newState.addressErrorMessage).toBe(undefined);
      });
    });
  });

  describe('receiveOfficials', () => {
    let state = undefined;
    beforeEach(() => {
      state = view(initialState, receiveOfficials([]));
    });
    it('does not change address error message', async () => {
      expect(state.addressErrorMessage).toBe(undefined);
    });
  });
});
