import {
  receiveHouse,
  receiveSenate,
  receiveOffices,
  receiveOfficialsAll,
  reset,
} from '../actions';
import officials, { INITIAL_OFFICIALS, OfficialsState } from './officials';
import { Record as LegislatorRecord } from '../models/Legislator';
import { Action, ActionType } from '../actions/types';
import { Office } from '../models/Office';
import { createCivicOfficeRecord } from '../models/Office.test';

function createLegislator(name: string, photoUrl?: string): LegislatorRecord {
  return {
    bio: {
      birthday: '',
      gender: '',
    },
    channels: [],
    id: {
      bioguide: name.toUpperCase(),
      fec: [],
      opensecrets: '',
    },
    name: {
      official_full: name,
    },
    photoUrl,
    terms: [],
  };
}

function action(): Action {
  return {
    type: ActionType.OTHER,
  };
}

it('provides an initial state when given undefined', () => {
  const initialState = officials(undefined, action());
  expect(initialState).toEqual(INITIAL_OFFICIALS);
});

it('has an empty object for initial dictionary', () => {
  const initialState = officials(undefined, action());
  expect(Object.keys(initialState.byBioguideId).length).toBe(0);
  expect(initialState.byBioguideId).toEqual({});
});

it('has an empty array for initial ids', () => {
  const initialState = officials(undefined, action());
  expect(initialState.legislators).toEqual([]);
});

it('adds an official to dictionary', () => {
  const state = officials(
    undefined,
    receiveOfficialsAll([createLegislator('John Smith')])
  );
  const { byBioguideId } = state;
  expect(Object.keys(byBioguideId).length).toBe(1);
  expect(Object.keys(byBioguideId)).toContain('JOHN SMITH');
});

it('does not change legisltors if byBioguideId not populated', () => {
  const state = officials(
    undefined,
    receiveHouse([{ bioguideId: 'JOHN SMITH', districtId: 'NY01' }])
  );
  const { legislators } = state;
  expect(legislators).toHaveLength(0);
});

it('overwrites an official in dictionary with same id', () => {
  const state = officials(
    undefined,
    receiveOfficialsAll([
      createLegislator('John Smith', '1'),
      createLegislator('John Smith', '2'),
    ])
  );
  const { byBioguideId } = state;
  expect(Object.keys(byBioguideId).length).toBe(1);
  expect(Object.keys(byBioguideId)).toContain('JOHN SMITH');
  expect(byBioguideId['JOHN SMITH'].photoUrl).toBe('2');
});

describe('w/ officials received', () => {
  const initialActions = [
    receiveOfficialsAll([createLegislator('John Smith')]),
    receiveHouse([{ bioguideId: 'JOHN SMITH', districtId: 'NY01' }]),
    receiveSenate([{ bioguideId: 'JOHN SMITH 2', state: 'NY' }]),
  ];
  const initialState: OfficialsState = initialActions.reduce(
    (state, action) => officials(state, action),
    INITIAL_OFFICIALS
  );

  it('populates a legislator when receiving an office', () => {
    const state = officials(
      initialState,
      receiveOffices([
        new Office(
          createCivicOfficeRecord('ocd-division/country:us/state:ny/cd:1')
        ),
      ])
    );
    const { legislators } = state;
    expect(legislators).toHaveLength(1);
  });

  it('can be reset', () => {
    const state = officials(initialState, reset());
    const { legislators } = state;
    expect(legislators).toHaveLength(0);
  });
});

describe('w/ officials and offices received', () => {
  const initialActions = [
    receiveOfficialsAll([createLegislator('John Smith')]),
    receiveHouse([{ bioguideId: 'JOHN SMITH', districtId: 'NY01' }]),
    receiveSenate([{ bioguideId: 'JOHN SMITH 2', state: 'NY' }]),
    receiveOffices([
      new Office(
        createCivicOfficeRecord('ocd-division/country:us/state:ny/cd:1')
      ),
    ]),
  ];
  const initialState: OfficialsState = initialActions.reduce(
    (state, action) => officials(state, action),
    INITIAL_OFFICIALS
  );

  it('has legislators', () => {
    const state = initialState;
    const { legislators } = state;
    expect(legislators).toHaveLength(1);
  });

  it('can be reset', () => {
    const state = officials(initialState, reset());
    const { legislators } = state;
    expect(legislators).toHaveLength(0);
  });
});
