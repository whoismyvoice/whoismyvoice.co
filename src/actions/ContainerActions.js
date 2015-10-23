import AppDispatcher from '../dispatcher/AppDispatcher';
import SenateConstants from '../constants/SenateConstants';

module.exports = {
	identifySection: function(index) {
		AppDispatcher.handleViewAction({
			actionType: SenateConstants.IDENTIFY_SECTION,
      index: index
		});
	}
};
