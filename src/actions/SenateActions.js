import AppDispatcher from '../dispatcher/AppDispatcher'
import SenateConstants from '../constants/SenateConstants'
import request from 'superagent'
import CongressUtils from '../utils/CongressUtils'
import {abbrState} from '../utils/StateConverter'

module.exports = {
  // Pass zip_code value from SearchInput and identify latitude and longitude for zip code
  // latlng is needed in order for Sunlight Foundation to identify correct congress person
	identifyMember: function(ZIP_CODE) {
		AppDispatcher.handleViewAction({
			actionType: SenateConstants.FIND_MEMBER,
      zip_code: ZIP_CODE
		});

    var place;

    if (isNaN(ZIP_CODE)) {
      // Check if the passed value is a full state name or abbr
      place = ZIP_CODE.length > 2 ? abbrState(ZIP_CODE, 'abbr') : ZIP_CODE.toUpperCase();

      if (place === undefined) {
        CongressUtils.getMember('error');
      } else {
        CongressUtils.getMember(place);
      }

    } else {
      // Get senators based on passed zip_code
      CongressUtils.getMember(ZIP_CODE);
    }
	}
};
