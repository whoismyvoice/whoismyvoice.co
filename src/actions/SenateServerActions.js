import AppDispatcher from '../dispatcher/AppDispatcher';
import SenateConstants from '../constants/SenateConstants';

module.exports = {
  getDetails: function(response) {
    AppDispatcher.handleServerAction({
      actionType: SenateConstants.GET_DETAILS,
      response: response
    });
  },
  getRandomMember: function(response) {
    AppDispatcher.handleServerAction({
      actionType: SenateConstants.GET_RANDOM_DETAILS,
    });
  }
};
