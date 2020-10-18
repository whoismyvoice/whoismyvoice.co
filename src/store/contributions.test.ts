import {
  receiveContribution,
  reset,
  receiveContributions,
  receiveContributionsBySector,
} from '../actions';
import { Action, ActionType } from '../actions/types';
import { createContribution } from '../models/Contribution.test';
import contributions, { INITIAL_CONTRIBUTIONS } from './contributions';

jest.mock('mixpanel-browser');

function action(): Action {
  return {
    type: ActionType.OTHER,
  };
}

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
    const state = actions.reduce(
      (s, a) => contributions(s, a),
      INITIAL_CONTRIBUTIONS
    );
    const { byOrganization } = state;
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
    const state = actions.reduce(
      (s, a) => contributions(s, a),
      INITIAL_CONTRIBUTIONS
    );
    const { byOrganization } = state;
    expect(Object.keys(byOrganization).length).toBe(1);
    expect(Object.keys(byOrganization)).toContain('SuperPAC');
    expect(byOrganization['SuperPAC'].length).toBe(3);
    expect(byOrganization['SuperPAC']).toContainEqual({
      amount: 1000,
      legislatorId: 'JOHN SMITH',
      organization: 'SuperPAC',
    });
    expect(byOrganization['SuperPAC']).toContainEqual({
      amount: 1000,
      legislatorId: 'JOHN SMITH JR.',
      organization: 'SuperPAC',
    });
    expect(byOrganization['SuperPAC']).toContainEqual({
      amount: 1000,
      legislatorId: 'JOHN SMITH III',
      organization: 'SuperPAC',
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
        initialState,
        receiveContribution('John Smith Jr.', 'SuperPAC', 2000)
      );
    });

    it('will not be reset', () => {
      const state = contributions(initialState, reset());
      expect(state.byOrganization).toEqual(initialState.byOrganization);
    });
  });
});

describe('sectors', () => {
  it('is initially empty', () => {
    const state = contributions(undefined, action());
    expect(state.sectors).toHaveLength(0);
  });

  it('is populated by SectorContributions', () => {
    const state = contributions(
      INITIAL_CONTRIBUTIONS,
      receiveContributionsBySector([
        {
          legislatorId: 'FOO',
          contributions: [{ amount: 300, sector: 'Agribiz', sectorCode: '2' }],
        },
      ])
    );
    expect(state.sectors).toHaveLength(1);
    expect(state.sectors).toContain('Agribiz');
  });

  it('is cleared by reset', () => {
    const state = contributions(
      { ...INITIAL_CONTRIBUTIONS, sectors: ['Agribiz'] },
      reset()
    );
    expect(state.sectors).toHaveLength(0);
  });

  it('contains a unique list', () => {
    const state = contributions(
      INITIAL_CONTRIBUTIONS,
      receiveContributionsBySector([
        {
          legislatorId: 'FOO',
          contributions: [{ amount: 300, sector: 'Agribiz', sectorCode: '2' }],
        },
        {
          legislatorId: 'BAR',
          contributions: [{ amount: 500, sector: 'Agribiz', sectorCode: '2' }],
        },
      ])
    );
    expect(state.sectors).toHaveLength(1);
    expect(state.sectors).toContain('Agribiz');
  });
});

describe('sectorsByLegislator', () => {
  it('is initially empty', () => {
    const state = contributions(undefined, action());
    expect(state.sectorsByLegislator).toEqual({});
  });

  it('is populated by SectorContributions', () => {
    const state = contributions(
      INITIAL_CONTRIBUTIONS,
      receiveContributionsBySector([
        {
          legislatorId: 'FOO',
          contributions: [{ amount: 300, sector: 'Agribiz', sectorCode: '2' }],
        },
      ])
    );
    const { sectorsByLegislator } = state;
    expect(Object.keys(sectorsByLegislator)).toHaveLength(1);
    expect(Object.keys(sectorsByLegislator)).toContain('FOO');
    expect(sectorsByLegislator.FOO.contributions).toContainEqual({
      amount: 300,
      sector: 'Agribiz',
      sectorCode: '2',
    });
  });

  it('is not cleared by reset', () => {
    const state = contributions(
      {
        ...INITIAL_CONTRIBUTIONS,
        sectorsByLegislator: {
          FOO: {
            legislatorId: 'FOO',
            contributions: [
              { amount: 300, sector: 'Agribiz', sectorCode: '2' },
            ],
          },
        },
      },
      reset()
    );
    expect(state.sectorsByLegislator.FOO).toBeDefined();
  });

  describe('existing state', () => {
    const createInitialState = () => {
      return contributions(
        INITIAL_CONTRIBUTIONS,
        receiveContributionsBySector([
          {
            legislatorId: 'FOO',
            contributions: [
              { amount: 300, sector: 'Agribiz', sectorCode: '2' },
            ],
          },
        ])
      );
    };

    it('overwrites existing contributions', () => {
      const state = contributions(
        createInitialState(),
        receiveContributionsBySector([
          {
            legislatorId: 'FOO',
            contributions: [
              { amount: 500, sector: 'Agribiz', sectorCode: '2' },
            ],
          },
        ])
      );
      const { sectorsByLegislator } = state;
      expect(Object.keys(sectorsByLegislator)).toHaveLength(1);
      expect(Object.keys(sectorsByLegislator)).toContain('FOO');
      expect(sectorsByLegislator.FOO.contributions).toContainEqual({
        amount: 500,
        sector: 'Agribiz',
        sectorCode: '2',
      });
    });
  });
});
