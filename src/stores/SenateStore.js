import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/SenateConstants';
import ObjectAssign from 'object-assign';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

let _store = {
  zip_code: '',
  state_full: '',
  did_search: false,
  error: false,
  current_member: null,
  number_representatives: null,
  number_house: null,
  representatives: null,
  settings: null
};

const SenateStore = ObjectAssign( {}, EventEmitter.prototype, {
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  getMember: () => {
    return _store;
  },
  getSettings: () => {
    return _store.settings;
  }
});

AppDispatcher.register(payload => {
  const action = payload.action;
  switch (action.actionType) {
  case AppConstants.FIND_MEMBER:
    _store.zip_code = action.zip_code;
    _store.error = false;

    SenateStore.emit(CHANGE_EVENT);
    break;
  case AppConstants.GET_DETAILS:
    _store.number_representatives = action.numRep;
    _store.number_house = action.number_house || null;
    if (action.response === 'error') {
      _store.error = true;
    } else {
      const details = action.response[0];
      _store.state_full = details.state_name || null;
      _store.did_search = true;
      _store.error = false;
      _store.representatives = action.response || null;
    }
    SenateStore.emit(CHANGE_EVENT);
    break;

  case AppConstants.FIND_SPECIFIC_MEMBER:

    SenateStore.emit(CHANGE_EVENT);
    break;

  case AppConstants.FETCH_SETTINGS:
    _store.settings = action.response;

    SenateStore.emit(CHANGE_EVENT);
    break;

  case AppConstants.SET_CURRENT_MEMBER:
    _store.current_member = action.index;

    SenateStore.emit(CHANGE_EVENT);
    break;

  case AppConstants.FLUSH_STORE:

    if (action.store !== 'settings') {
      _store.did_search = false;
      _store.current_member = 0;
      _store.second_search = false;
      _store.number_representatives = null;
    } else {
      _store.settings = null;
    }

    SenateStore.emit(CHANGE_EVENT);
    break;

  default:
    return true;
  }
});

module.exports = SenateStore;
