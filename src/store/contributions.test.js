import {
  receiveContributionData,
  reset,
} from '../actions';
import contributions from './contributions';

it('provides an initial state when given undefined', () => {
  const initialState = contributions(undefined, {});
  expect(initialState).toBeDefined();
  expect(initialState.byName).toBeDefined();
});

it('has an empty object for initial dictionary', () => {
  const initialState = contributions(undefined, {});
  expect(Object.keys(initialState.byName).length).toBe(0);
  expect(initialState.byName).toEqual({});
});

it('adds an official to dictionary', () => {
  const state = contributions(undefined, receiveContributionData(
    'John Smith',
    1000,
  ));
  const { byName, } = state;
  expect(Object.keys(byName).length).toBe(1);
  expect(Object.keys(byName)).toContain('John Smith');
});

it('overwrites an official in dictionary with same id', () => {
  const state = (() => {
    let state = contributions(undefined, receiveContributionData(
      'John Smith',
      1000,
    ));
    state = contributions(undefined, receiveContributionData(
      'John Smith',
      2000,
    ));
    return state;
  })();
  const { byName, } = state;
  expect(Object.keys(byName).length).toBe(1);
  expect(Object.keys(byName)).toContain('John Smith');
  expect(byName['John Smith']).toBe(2000);
});

describe('existing state', () => {
  let initialState = contributions(undefined, {});
  beforeEach(() => {
    initialState = contributions(undefined, receiveContributionData(
      'John Smith',
      1000,
    ));
    initialState = contributions(undefined, receiveContributionData(
      'John Smith Jr.',
      2000,
    ));
  });

  it('will not be reset', () => {
    const state = contributions(initialState, reset());
    expect(state).toBe(initialState);
  });
});