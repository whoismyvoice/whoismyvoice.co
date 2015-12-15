import AppDispatcher from '../dispatcher/AppDispatcher';
import SenateConstants from '../constants/SenateConstants';

module.exports = {
  setCurrentMember: index => {
    AppDispatcher.handleViewAction({
      actionType: SenateConstants.SET_CURRENT_MEMBER,
      index: index
    });
  }
};
