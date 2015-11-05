import AppDispatcher from '../dispatcher/AppDispatcher';
import SenateConstants from '../constants/SenateConstants';

module.exports = {
  getDetails: function(response, numRep) {
    AppDispatcher.handleServerAction({
      actionType: SenateConstants.GET_DETAILS,
      response: response,
      numRep: numRep
    });
  },
};
