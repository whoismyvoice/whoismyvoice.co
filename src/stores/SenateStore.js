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
  current_screen: null,
  current_senator: null,
  number_representatives: null,
  representatives: null,
  second_search: null
};

// Define the public event listeners and getters that
//  the views will use to listen for changes and retrieve the store

const SenateStore = ObjectAssign( {}, EventEmitter.prototype, {
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  getMember: function() {
    return _store;
  }
});

AppDispatcher.register(function(payload) {

  const action = payload.action;

  switch(action.actionType) {

    case AppConstants.FIND_MEMBER:

      _store.zip_code = action.zip_code;
      _store.error = false;

      SenateStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.GET_DETAILS:

      _store.number_representatives = action.numRep;

      if (action.numRep > 3) {
        console.log("More than 3 representatives within zip code");
      } else if (action.numRep > 1 && action.numRep < 4) {
        _store.second_search = true,
        _store.representatives = action.response || null,
        _store.error = false,
        _store.did_search = true;
      } else if(action.numRep === 1) {
        if (action.response === 'error') {
        _store.error = true;
        } else {
          const details = action.response[0];
          _store.state_full = details.state_name || null,
          _store.error = false,
          _store.did_search = true,
          _store.representatives = action.response || null;
        };
      }
      SenateStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.FIND_SPECIFIC_MEMBER:
      SenateStore.emit(CHANGE_EVENT);
      break;
      
    case AppConstants.IDENTIFY_SECTION:

      _store.current_screen = action.index;

      SenateStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.SET_CURRENT_MEMBER:
        _store.current_senator = action.index;

      SenateStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.FLUSH_STORE:
      _store.did_search = false;
      _store.current_screen = 0;
      _store.current_senator = 0;

      SenateStore.emit(CHANGE_EVENT);
      break;

    default:
        return true;
  }
});

module.exports = SenateStore;
