import AppDispatcher from '../dispatcher/AppDispatcher';
import SenateConstants from '../constants/SenateConstants';
import request from 'superagent';
import CongressUtils from '../utils/CongressUtils';

module.exports = {
  // Pass zip_code value from SearchInput and identify latitude and longitude for zip code
  // latlng is needed in order for Sunlight Foundation to identify correct congress person
	fetchDistricts: ZIP_CODE => {
		AppDispatcher.handleViewAction({
			actionType: SenateConstants.FIND_MEMBER,
      zip_code: ZIP_CODE
		});
    CongressUtils.getMember(ZIP_CODE);
  },

  fetchSpecificMember: (ADDRESS, ZIP) => {
    AppDispatcher.handleViewAction({
      actionType: SenateConstants.FIND_SPECIFIC_MEMBER,
      address: ADDRESS,
      zip_code: ZIP
    });

    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${ADDRESS},${ZIP},USA&key=${SenateConstants.GOOGLE_API_KEY}`;
    request
    .get(url)
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err) return console.error(err);
      if (res.body.results.length === 0) {
        CongressUtils.getMember('error');
      } else {
        const lat = res.body.results[0].geometry.location.lat,
        lng = res.body.results[0].geometry.location.lng;
        CongressUtils.getMember(lat, lng);
      }
    });
  },
  flush: () => {
    AppDispatcher.handleViewAction({
      actionType: SenateConstants.FLUSH_STORE
    });
  }
};
