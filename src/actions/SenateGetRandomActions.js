import AppDispatcher from '../dispatcher/AppDispatcher'
import SenateConstants from '../constants/SenateConstants'
import RandomMemberUtils from '../utils/RandomMemberUtils'

module.exports = {
  getRandomMember: function(response) {
    AppDispatcher.handleServerAction({
      actionType: SenateConstants.GET_RANDOM_DETAILS
    });
    RandomMemberUtils.getRandomMember();
  }
};
