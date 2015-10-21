import AppDispatcher from '../dispatcher/AppDispatcher';
import SenateConstants from '../constants/SenateConstants';

module.exports = {

  // Pass zip_code value from SearchInput and identify latitude and longitude for zip code
  // latlng is needed in order for Sunlight Foundation to identify correct congress person
	setCurrentMember: function(index) {
    
		AppDispatcher.handleViewAction({
			actionType: SenateConstants.SET_CURRENT_MEMBER,
      		index: index
		});
	},
};
