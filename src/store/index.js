import thunkMiddleware from 'redux-thunk';
import { createLogger, } from 'redux-logger';
import { applyMiddleware, combineReducers, createStore, } from 'redux';

import address from './address';
import contributions from './contributions';
import officials from './officials';
import view from './view';

const loggerMiddleware = createLogger();

export default createStore(
  combineReducers({
    address,
    contributions,
    officials,
    view,
  }),
  {},
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware,
  )
);
