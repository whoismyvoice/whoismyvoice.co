import AppDispatcher from '../dispatcher/AppDispatcher';
import SenateConstants from '../constants/SenateConstants';

module.exports = {
	setCurrentMember: function(index) {
		AppDispatcher.handleViewAction({
			actionType: SenateConstants.SET_CURRENT_MEMBER,
      		index: index
		});
	},
};
