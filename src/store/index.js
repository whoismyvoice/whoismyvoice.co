import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import promiseMiddleware from 'redux-promise';
import { applyMiddleware, combineReducers, createStore } from 'redux';

import address from './address';
import contributions from './contributions';
import officials from './officials';
import view from './view';

import type { AddressState } from './address';
import type { ContributionsState } from './contributions';
import type { OfficialsState } from './officials';
import type { ViewState } from './view';

export type State = $Exact<{
  address: AddressState,
  contributions: ContributionsState,
  officials: OfficialsState,
  view: ViewState,
}>;

const loggerMiddleware = createLogger();

export default createStore(
  combineReducers({
    address,
    contributions,
    officials,
    view,
  }),
  {},
  applyMiddleware(thunkMiddleware, promiseMiddleware, loggerMiddleware)
);
