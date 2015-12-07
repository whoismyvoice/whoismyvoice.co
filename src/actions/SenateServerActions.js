import AppDispatcher from '../dispatcher/AppDispatcher';
import SenateConstants from '../constants/SenateConstants';

module.exports = {
  getDetails: (response, numRep) => {
    AppDispatcher.handleServerAction({
      actionType: SenateConstants.GET_DETAILS,
      response: response,
      numRep: numRep
    });
  },
  fetchSettings: response => {
    AppDispatcher.handleServerAction({
      actionType: SenateConstants.FETCH_SETTINGS,
      response: response
    });
  },
};
