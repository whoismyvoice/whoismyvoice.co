import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import * as promiseMiddleware from 'redux-promise';
import { applyMiddleware, combineReducers, createStore } from 'redux';

import address, { AddressState } from './address';
import contributions, { ContributionsState } from './contributions';
import officials, { OfficialsState } from './officials';
import view, { ViewState } from './view';

export type State = {
  address: AddressState;
  contributions: ContributionsState;
  officials: OfficialsState;
  view: ViewState;
};

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
