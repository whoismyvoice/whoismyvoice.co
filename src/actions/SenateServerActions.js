import AppDispatcher from '../dispatcher/AppDispatcher';
import SenateConstants from '../constants/SenateConstants';

module.exports = {
  getDetails: (response, number_representatives, number_house) => {
    AppDispatcher.handleServerAction({
      actionType: SenateConstants.GET_DETAILS,
      response: response,
      numRep: number_representatives,
      number_house: number_house
    });
  },
  fetchSettings: response => {
    AppDispatcher.handleServerAction({
      actionType: SenateConstants.FETCH_SETTINGS,
      response: response
    });
  },
};
