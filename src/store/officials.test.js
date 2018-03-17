import { receiveOfficials, receiveOfficialsAll, reset } from '../actions';
import officials from './officials';

jest.mock('mixpanel-browser');

it('provides an initial state when given undefined', () => {
  const initialState = officials(undefined, {});
  expect(initialState).toBeDefined();
});

it('has an empty object for initial dictionary', () => {
  const initialState = officials(undefined, {});
  expect(Object.keys(initialState.byId).length).toBe(0);
  expect(initialState.byId).toEqual({});
});

it('has an empty array for initial ids', () => {
  const initialState = officials(undefined, {});
  expect(initialState.ids).toEqual([]);
});

it('adds an official to dictionary', () => {
  const state = officials(
    undefined,
    receiveOfficialsAll([{ name: { official_full: 'John Smith' } }])
  );
  const { byId } = state;
  expect(Object.keys(byId).length).toBe(1);
  expect(Object.keys(byId)).toContain('John Smith');
});

it('adds an id of official to list', () => {
  const state = officials(
    undefined,
    receiveOfficials([{ name: 'John Smith' }])
  );
  const { ids } = state;
  expect(ids).toContain('John Smith');
});

it('overwrites an official in dictionary with same id', () => {
  const state = officials(
    undefined,
    receiveOfficialsAll([
      { name: { official_full: 'John Smith' }, photoUrl: '1' },
      { name: { official_full: 'John Smith' }, photoUrl: '2' },
    ])
  );
  const { byId } = state;
  expect(Object.keys(byId).length).toBe(1);
  expect(Object.keys(byId)).toContain('John Smith');
});

it('overwrites an official in list with same id', () => {
  const state = officials(
    undefined,
    receiveOfficials([
      { name: 'John Smith', photoUrl: '1' },
      { name: 'John Smith', photoUrl: '2' },
    ])
  );
  const { ids } = state;
  expect(ids).toContain('John Smith');
  expect(ids.length).toBe(1);
});

it('contains all official ids in list', () => {
  const state = officials(
    undefined,
    receiveOfficials([
      { name: 'John Smith', photoUrl: '1' },
      { name: 'John Smith Jr.', photoUrl: '2' },
    ])
  );
  const { ids } = state;
  expect(ids).toContain('John Smith');
  expect(ids).toContain('John Smith Jr.');
  expect(ids.length).toBe(2);
});

it('merges data from receiveOfficials and receiveOfficialsAll', () => {
  const initialState = officials(
    undefined,
    receiveOfficials([
      { name: 'John Smith', photoUrl: '1' },
      { name: 'John Smith Jr.', photoUrl: '2' },
    ])
  );
  const state = officials(
    initialState,
    receiveOfficialsAll([
      { name: { official_full: 'John Smith' }, photoUrl: '3' },
      { name: { official_full: 'John Smith Jr.' }, photoUrl: '4' },
    ])
  );
  const { byId } = state;
  expect(byId['John Smith']).toBeDefined();
  expect(byId['John Smith'].name).toEqual({ official_full: 'John Smith' });
  expect(byId['John Smith'].photoUrl).toEqual('3');
});

describe('existing state', () => {
  let initialState = officials(undefined, {});
  beforeEach(() => {
    initialState = officials(
      undefined,
      receiveOfficials([
        { name: 'John Smith', photoUrl: '1' },
        { name: 'John Smith Jr.', photoUrl: '2' },
      ])
    );
  });

  it('can be reset', () => {
    const state = officials(initialState, reset());
    const { ids } = state;
    expect(ids.length).toBe(0);
  });
});
