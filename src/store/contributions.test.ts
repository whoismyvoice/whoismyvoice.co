/* tslint:disable:no-string-literal */
import { receiveContribution, reset, receiveContributions } from '../actions';
import { Action, ActionType } from '../actions/types';
import { createContribution } from '../models/Contribution.test';
import contributions, { ContributionsState } from './contributions';

jest.mock('mixpanel-browser');

function action(): Action {
  return {
    type: ActionType.OTHER,
  };
}

type State = ContributionsState | undefined;

it('provides an initial state when given undefined', () => {
  const initialState = contributions(undefined, action());
  expect(initialState).toBeDefined();
  expect(initialState.byOrganization).toBeDefined();
});

it('has an empty object for initial dictionary', () => {
  const initialState = contributions(undefined, action());
  expect(Object.keys(initialState.byOrganization).length).toBe(0);
  expect(initialState.byOrganization).toEqual({});
});

describe('byOrganization', () => {
  it('adds an organization to dictionary', () => {
    const state = contributions(
      undefined,
      receiveContribution('John Smith', 'SuperPAC', 1000)
    );
    const { byOrganization } = state;
    expect(Object.keys(byOrganization).length).toBe(1);
    expect(Object.keys(byOrganization)).toContain('SuperPAC');
  });

  it('overwrites an official in organization dictionary with same id', () => {
    const actions = [
      receiveContribution('John Smith', 'SuperPAC', 1000),
      receiveContribution('John Smith', 'SuperPAC', 2000),
    ];
    const state = actions.reduce<State>((s, a) => contributions(s, a), undefined);
    const { byOrganization } = state!;
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

  it('processes bulk contributions', () => {
    const contributionsRecords = [
      createContribution('John Smith'),
      createContribution('John Smith Jr.'),
      createContribution('John Smith III'),
    ];
    const actions = [receiveContributions(contributionsRecords)];
    const state = actions.reduce<State>((s, a) => contributions(s, a), undefined);
    const { byOrganization } = state!;
    expect(Object.keys(byOrganization).length).toBe(1);
    expect(Object.keys(byOrganization)).toContain('SuperPAC');
    expect(byOrganization['SuperPAC'].length).toBe(3);
    expect(byOrganization['SuperPAC']).toContainEqual({
      amount: 1000,
      legislatorId: 'johnsmith',
      organization: 'SuperPAC',
    });
    expect(byOrganization['SuperPAC']).toContainEqual({
      amount: 1000,
      legislatorId: 'johnsmithjr',
      organization: 'SuperPAC',
    });
    expect(byOrganization['SuperPAC']).toContainEqual({
      amount: 1000,
      legislatorId: 'johnsmithiii',
      organization: 'SuperPAC',
    });
  });
});

describe('existing state', () => {
  let initialState = contributions(undefined, action());
  beforeEach(() => {
    initialState = contributions(
      undefined,
      receiveContribution('John Smith', 'SuperPAC', 1000)
    );
    initialState = contributions(
      undefined,
      receiveContribution('John Smith Jr.', 'SuperPAC', 2000)
    );
  });

  it('will not be reset', () => {
    const state = contributions(initialState, reset());
    expect(state).toBe(initialState);
  });
});
