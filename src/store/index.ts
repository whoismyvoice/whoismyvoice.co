import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import { applyMiddleware, combineReducers, createStore } from 'redux';

import address, { AddressState } from './address';
import contributions, { ContributionsState } from './contributions';
import officials, { OfficialsState } from './officials';
import view, { ViewState } from './view';

export interface State {
  readonly address: AddressState;
  readonly contributions: ContributionsState;
  readonly officials: OfficialsState;
  readonly view: ViewState;
}

export default createStore(
  combineReducers<State>({
    address,
    contributions,
    officials,
    view,
  }),
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);
