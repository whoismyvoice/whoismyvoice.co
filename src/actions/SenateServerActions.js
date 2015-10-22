import AppDispatcher from '../dispatcher/AppDispatcher';
import SenateConstants from '../constants/SenateConstants';

module.exports = {
  getDetails: function(response, hfc) {
    AppDispatcher.handleServerAction({
      actionType: SenateConstants.GET_DETAILS,
      response: response,
      hfc: hfc || false
    });
  },
};