import AppDispatcher from '../dispatcher/AppDispatcher';
import SenateConstants from '../constants/SenateConstants';
import request from 'superagent-bluebird-promise';

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
