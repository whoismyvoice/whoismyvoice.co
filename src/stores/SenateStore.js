import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/SenateConstants';
import ObjectAssign from 'object-assign';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

let _store = {
	member_name: '',
	member_bioguide: '',
  member_zip_code: '',
  member_age: '',
  member_gender: '',
  member_state: '',
  member_email: '',
  member_tel: '',
  member_party: '',
  additional_member: null,
  did_search: false,
  error: false,
  current_screen: null,
  current_senator: null,
  number_representatives: null,
  representatives: null
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

      _store.member_zip_code = action.zip_code;
      _store.error = false;

      SenateStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.GET_DETAILS:

      _store.number_representatives = action.numRep;

      if(action.numRep > 3) {
        console.log("More than 3 representatives within zip code");
      } else {
        if (action.response === 'error') {
        _store.error = true;
        } else {
          const details = action.response[0],
                additionalSenator = action.response.length > 1 ? action.response[1]: '';

          _store.member_name = details.full_name
          _store.member_age = details.age,
          _store.member_bioguide = details.bioguide_id || null,
          _store.member_gender = details.gender_full || null,
          _store.member_state_full = details.state_name || null,
          _store.error = false,
          _store.did_search = true,
          _store.additional_member = additionalSenator || null,
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

      SenateStore.emit(CHANGE_EVENT);
      break;

    default:
        return true;
  }
});

module.exports = SenateStore;
