import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/SenateConstants';
import ObjectAssign from 'object-assign';
import { EventEmitter } from 'events';

const CHANGE_EVENT = 'change';

// Define store as empty

var _store = {
	member_name: '',
	member_bioguide: '',
	voted_for: false
}

// Define the public event listeners and getters that
//  the views will use to listen for changes and retrieve the store

const SenateStore = ObjectAssign( {}, EventEmitter.prototype, {

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
    console.log("Add change listener");
    console.log(_store);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
    console.log("Removed change listener");
  },

  getMember: function() {
    return _store;
  }
});

// Register each of the actions with the dispatcher
// by changing the store's data and emitting a change

AppDispatcher.register(function(payload) {

  var action = payload.action;

  switch(action.actionType) {

    case AppConstants.FIND_MEMBER:

      // Add the data defined in the actions
      // which the view will pass as a payload
      console.log("Find Member started");
      SenateStore.emit(CHANGE_EVENT);
      break;

    default:
        return true;
  }
});

module.exports = SenateStore;