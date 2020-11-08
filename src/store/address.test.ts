/* tslint:disable:no-string-literal */
import { receiveAddress, receiveZipCode, reset } from '../actions';
import { Action, ActionType } from '../actions/types';
import address from './address';

function action(): Action {
  return {
    type: ActionType.OTHER,
  };
}

const initialState = address(undefined, action());

it('provides an initial state when given undefined', () => {
  expect(initialState).toBeDefined();
  expect(initialState.latitude).toBeUndefined();
  expect(initialState.longitude).toBeUndefined();
  expect(initialState.street).toBeUndefined();
  expect(initialState.value).toBeUndefined();
  expect(initialState.zipCode).toBeUndefined();
});

it('sets zip code', () => {
  const state = address(initialState, receiveZipCode('12345'));
  expect(state.latitude).toBeUndefined();
  expect(state.longitude).toBeUndefined();
  expect(state.street).toBeUndefined();
  expect(state.value).toBeUndefined();
  expect(state.zipCode).toBe('12345');
});

it('throws error if setting address with no zip', () => {
  const addressAction = receiveAddress('123 Main St., 12345');
  expect(address.bind(address, initialState, addressAction)).toThrow(Error);
});

describe('zip set', () => {
  const state = address(initialState, receiveZipCode('12345'));
  it('sets address', () => {
    const result = address(state, receiveAddress('123 Main St., 12345'));
    expect(result.latitude).toBeUndefined();
    expect(result.longitude).toBeUndefined();
    expect(result.street).toBe('123 Main St.');
    expect(result.value).toBe('123 Main St., 12345');
    expect(result.zipCode).toBe('12345');
  });
  it('will be reset', () => {
    const result = address(state, reset());
    expect(result).toEqual(initialState);
  });
});

describe('zip and address set', () => {
  const actions = [
    receiveZipCode('12345'),
    receiveAddress('123 Main St., 12345'),
  ];
  const state = actions.reduce((s, a) => address(s, a), initialState);
  it('will be reset', () => {
    const result = address(state, reset());
    expect(result).toEqual(initialState);
  });
});
