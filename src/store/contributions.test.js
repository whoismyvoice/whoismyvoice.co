import {
  receiveContributionData,
  reset,
} from '../actions';
import contributions from './contributions';

it('provides an initial state when given undefined', () => {
  const initialState = contributions(undefined, {});
  expect(initialState).toBeDefined();
  expect(initialState.byOrganization).toBeDefined();
});

it('has an empty object for initial dictionary', () => {
  const initialState = contributions(undefined, {});
  expect(Object.keys(initialState.byOrganization).length).toBe(0);
  expect(initialState.byOrganization).toEqual({});
});

describe('byOrganization', () => {
  it('adds an organization to dictionary', () => {
    const state = contributions(undefined, receiveContributionData(
      'John Smith',
      'SuperPAC',
      1000,
    ));
    const { byOrganization, } = state;
    expect(Object.keys(byOrganization).length).toBe(1);
    expect(Object.keys(byOrganization)).toContain('SuperPAC');
  });

  it('overwrites an official in organization dictionary with same id', () => {
    const state = (() => {
      let state = contributions(undefined, receiveContributionData(
        'John Smith',
        'SuperPAC',
        1000,
      ));
      state = contributions(undefined, receiveContributionData(
        'John Smith',
        'SuperPAC',
        2000,
      ));
      return state;
    })();
    const { byOrganization, } = state;
    expect(Object.keys(byOrganization).length).toBe(1);
    expect(Object.keys(byOrganization)).toContain('SuperPAC');
    expect(byOrganization['SuperPAC']).not.toContainEqual({
      amount: 1000,
      legislatorId: 'John Smith',
      organization: 'SuperPAC',
    });
    expect(byOrganization['SuperPAC']).toContainEqual({
      amount: 2000,
      legislatorId: 'John Smith',
      organization: 'SuperPAC',
    });
  });
});

describe('existing state', () => {
  let initialState = contributions(undefined, {});
  beforeEach(() => {
    initialState = contributions(undefined, receiveContributionData(
      'John Smith',
      'SuperPAC',
      1000,
    ));
    initialState = contributions(undefined, receiveContributionData(
      'John Smith Jr.',
      'SuperPAC',
      2000,
    ));
  });

  it('will not be reset', () => {
    const state = contributions(initialState, reset());
    expect(state).toBe(initialState);
  });
});
