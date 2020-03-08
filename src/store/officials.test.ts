import { receiveOfficials, receiveOfficialsAll, reset } from '../actions';
import officials from './officials';
import { Record as LegislatorRecord } from '../models/Legislator';
import { Record as Official } from '../models/Official';
import { Action, ActionType } from '../actions/types';

jest.mock('mixpanel-browser');

function createLegislator(name: string, photoUrl?: string): LegislatorRecord {
  return {
    bio: {
      birthday: '',
      gender: '',
    },
    channels: [],
    id: {
      bioguide: '',
      fec: [],
    },
    name: {
      // eslint-disable-next-line @typescript-eslint/camelcase
      official_full: name,
    },
    photoUrl,
    terms: [],
  };
}

function createOfficial(name: string, photoUrl?: string): Official {
  return {
    name,
    photoUrl: photoUrl,
    channels: [],
  };
}

function action(): Action {
  return {
    type: ActionType.OTHER,
  };
}

it('provides an initial state when given undefined', () => {
  const initialState = officials(undefined, action());
  expect(initialState).toBeDefined();
});

it('has an empty object for initial dictionary', () => {
  const initialState = officials(undefined, action());
  expect(Object.keys(initialState.byId).length).toBe(0);
  expect(initialState.byId).toEqual({});
});

it('has an empty array for initial ids', () => {
  const initialState = officials(undefined, action());
  expect(initialState.ids).toEqual([]);
});

it('adds an official to dictionary', () => {
  const state = officials(
    undefined,
    receiveOfficialsAll([createLegislator('John Smith')])
  );
  const { byId } = state;
  expect(Object.keys(byId).length).toBe(1);
  expect(Object.keys(byId)).toContain('johnsmith');
});

it('adds an id of official to list', () => {
  const state = officials(
    undefined,
    receiveOfficials([createOfficial('John Smith')])
  );
  const { ids } = state;
  expect(ids).toContain('johnsmith');
});

it('overwrites an official in dictionary with same id', () => {
  const state = officials(
    undefined,
    receiveOfficialsAll([
      createLegislator('John Smith', '1'),
      createLegislator('John Smith', '2'),
    ])
  );
  const { byId } = state;
  expect(Object.keys(byId).length).toBe(1);
  expect(Object.keys(byId)).toContain('johnsmith');
});

it('overwrites an official in list with same id', () => {
  const state = officials(
    undefined,
    receiveOfficials([
      createOfficial('John Smith', '1'),
      createOfficial('John Smith', '2'),
    ])
  );
  const { ids } = state;
  expect(ids).toContain('johnsmith');
  expect(ids.length).toBe(1);
});

it('contains all official ids in list', () => {
  const state = officials(
    undefined,
    receiveOfficials([
      createOfficial('John Smith', '1'),
      createOfficial('John Smith Jr.', '2'),
    ])
  );
  const { ids } = state;
  expect(ids).toContain('johnsmith');
  expect(ids).toContain('johnsmithjr');
  expect(ids.length).toBe(2);
});

it('merges data from receiveOfficials and receiveOfficialsAll', () => {
  const initialState = officials(
    undefined,
    receiveOfficials([
      createOfficial('John Smith', '1'),
      createOfficial('John Smith Jr.', '2'),
    ])
  );
  const state = officials(
    initialState,
    receiveOfficialsAll([
      createLegislator('John Smith', '3'),
      createLegislator('John Smith Jr.', '4'),
    ])
  );
  const { byId } = state;
  expect(byId['johnsmith']).toBeDefined();
  // eslint-disable-next-line @typescript-eslint/camelcase
  expect(byId['johnsmith'].name).toEqual({ official_full: 'John Smith' });
  expect(byId['johnsmith'].photoUrl).toEqual('3');
});

describe('existing state', () => {
  let initialState = officials(undefined, action());
  beforeEach(() => {
    initialState = officials(
      undefined,
      receiveOfficials([
        createOfficial('John Smith', '1'),
        createOfficial('John Smith Jr.', '2'),
      ])
    );
  });

  it('can be reset', () => {
    const state = officials(initialState, reset());
    const { ids } = state;
    expect(ids.length).toBe(0);
  });
});
