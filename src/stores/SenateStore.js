import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/SenateConstants';
import ObjectAssign from 'object-assign';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

// Define store as empty

var _store = {
	member_name: '',
	member_bioguide: '',
  member_zip_code: '',
	voted_for: false
}

// Define the public event listeners and getters that
//  the views will use to listen for changes and retrieve the store

const SenateStore = ObjectAssign( {}, EventEmitter.prototype, {

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
    console.log("Added change listener");
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
    console.log("Removed change listener");
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

      // Set store values to reflect returned object
      _store.member_name = details.first_name;
      _store.member_bioguide = details.bioguide_id;

      // Emit change to update UI
      SenateStore.emit(CHANGE_EVENT);
      break;

    default:
        return true;
  }
});

module.exports = SenateStore;
