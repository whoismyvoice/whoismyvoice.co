import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/SenateConstants';
import SenateGetRandomActions from '../actions/SenateGetRandomActions';
import ObjectAssign from 'object-assign';
import { EventEmitter } from 'events';

import HFCMembers from '../data/HFCMembers';
import votedFor from '../data/votedFor';

const CHANGE_EVENT = 'change';

// Define store as empty

var _store = {
	member_name: '',
	member_bioguide: '',
  member_zip_code: '',
  member_age: '',
  member_chamber: '',
  member_gender: '',
  member_email: '',
  member_tel: '',
  member_twitter: '',
	voted_for: false,
  member_random: false
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
    console.log('GET MEMBER: ');

    // Let us know when getMember is called and return store for cross checking
    console.log(_store);
    return _store;
  }
});

// Register each of the actions with the dispatcher
// by changing the store's data and emitting a change

// Since zip_code and member details require two different API calls - 
// two separate actionTypes have been defined

AppDispatcher.register(function(payload) {

  var action = payload.action;

  switch(action.actionType) {

    case AppConstants.FIND_MEMBER:

      // Add the data defined in the actions
      // which the view will pass as a payload
      _store.member_zip_code = action.zip_code;

      SenateStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.GET_DETAILS:

      // Set var to returned object
      var details = action.response.results[0];
      var didVote = true;

      // Set store values to reflect returned object

      _store.member_name = details.first_name + ' ' + details.middle_name + ' ' + details.last_name || null;
      _store.member_bioguide = details.bioguide_id || null;
      _store.member_age = (2015-details.birthday.substring(0,4)) || null;
      _store.member_chamber = details.chamber || null;
      _store.member_gender = details.gender || null;
      _store.member_email = details.oc_email || null;
      _store.member_tel = details.phone || null;
      _store.member_twitter = details.twitter_id || null;
      _store.voted_for = didVote;
      _store.member_random = action.random;
        // Select random bioguide_id from ../data/HFCMembers.js
        // Retrieve new details based on bioguide_id using a separate utils method
        // This new method should also call a separate actionType, which then overwrites the store
        // The very same ActionType could be used to get a random member again and again and again
        // getRandomHFC() e.g.

      // Emit change to update UI
      SenateStore.emit(CHANGE_EVENT);
      break;

    default:
        return true;
  }
});

module.exports = SenateStore;
