import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/SenateConstants'
import ObjectAssign from 'object-assign'
import { EventEmitter } from 'events'
import HFCMembers from '../data/HFCMembers'
import votedFor from '../data/votedFor'

const CHANGE_EVENT = 'change'

// Define store as empty

var _store = {
	member_name: '',
	member_bioguide: '',
  member_zip_code: '',
  member_age: '',
  member_gender: '',
  member_state: '',
  member_email: '',
  member_tel: '',
  member_twitter: '',
  member_party: '',
  additional_member: null,
  member_hfc: false,
  did_search: false,
  error_msg: '',
  current_screen: null,
  current_senator: null
}

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

  var action = payload.action;

  switch(action.actionType) {

    case AppConstants.FIND_MEMBER:

      _store.member_zip_code = action.zip_code;

      SenateStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.GET_DETAILS:

      if(action.response === 'error') {
        _store.error_msg = 'Ineligible zip code';
      } else {

        var details = action.response[0];
        var additionalSenator = action.response.length > 1 ? action.response[1]: '';

        // Set store values to reflect returned object
        var middle_name = details.middle_name === null ? '' : details.middle_name;

        _store.member_name = details.first_name + ' ' + middle_name + ' ' + details.last_name || '',
        _store.member_bioguide = details.bioguide_id || null,
        _store.member_age = (2015-details.birthday.substring(0,4)) || null,
        _store.member_gender = details.gender || null,
        _store.member_email = details.oc_email || null,
        _store.member_tel = details.phone || null,
        _store.member_twitter = details.twitter_id || null,
        _store.member_party = details.party,
        _store.member_state = details.state || null,
        _store.member_state_full = details.state_name || null,
        _store.error_msg = '',
        _store.did_search = true,
        _store.additional_member = additionalSenator || null
      }

      SenateStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.GET_RANDOM_DETAILS:
      _store.member_hfc = true;
      _store.did_search = true;

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
      _store.member_hfc = false;
      _store.current_screen = 0;

      SenateStore.emit(CHANGE_EVENT);
      break;

    default:
        return true;
  }
});

module.exports = SenateStore;
