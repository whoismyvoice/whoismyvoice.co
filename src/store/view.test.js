import {
  toggleMenu,
} from '../actions';
import view from './view';

describe('initial state', () => {
  const initialState = view(undefined, {});
  it('provides an initial state when given undefined', () => {
    expect(initialState).toBeDefined();
  });
  it('has the menu closed in initial state', () => {
    expect(initialState.isMenuOpen).toBe(false);
  });

  describe('toggleMenu', () => {
    const state = view(initialState, toggleMenu());
    it('opens the menu', () => {
      expect(state.isMenuOpen).toBe(true);
    });
  });
});
