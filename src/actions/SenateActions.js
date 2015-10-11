import AppDispatcher from '../dispatcher/AppDispatcher';
import SenateConstants from '../constants/SenateConstants';
import ZipUtils from '../utils/ZipUtils';

module.exports = {

	identifyMember: function(zip_code) {
		AppDispatcher.handleViewAction({
			actionType: SenateConstants.FIND_MEMBER,
      zip_code: zip_code
		});
    // API CALL
    ZipUtils.get(zip_code);
	}

};