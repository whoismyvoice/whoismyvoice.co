import { reset, receiveContributionsBySector } from '../actions';
import { Action, ActionType } from '../actions/types';
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
});

it('has an empty object for initial dictionary', () => {
  const initialState = contributions(undefined, action());
  expect(Object.keys(initialState.sectorsByLegislator).length).toBe(0);
  expect(initialState.sectorsByLegislator).toEqual({});
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
