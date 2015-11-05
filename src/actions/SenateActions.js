import AppDispatcher from '../dispatcher/AppDispatcher';
import SenateConstants from '../constants/SenateConstants';
import request from 'superagent';
import CongressUtils from '../utils/CongressUtils';
import MemberUtils from '../utils/MemberUtils';
import {abbrState} from '../utils/StateConverter';

module.exports = {
  // Pass zip_code value from SearchInput and identify latitude and longitude for zip code
  // latlng is needed in order for Sunlight Foundation to identify correct congress person
	fetchDistricts: function(ZIP_CODE) {
		AppDispatcher.handleViewAction({
			actionType: SenateConstants.FIND_MEMBER,
      zip_code: ZIP_CODE
		});
    
    CongressUtils.getMember(ZIP_CODE);
  },
  
  fetchSpecificMember: function(ADDRESS,ZIP_CODE) {
    AppDispatcher.handleViewAction({
      actionType: SenateConstants.FIND_SPECIFIC_MEMBER,
      address: ADDRESS,
      zip_code: ZIP_CODE
    });

    const apikey = 'AIzaSyBszQnBTm_2qjgMd57K0CLfE0i3zuveKhE';
    const api = 'https://maps.googleapis.com/maps/api/geocode/json?address='+ ADDRESS +','+ ZIP_CODE +',USA&key='+ apikey;
    
    request
    .get(api)
    .set('Accept', 'application/json')
    .end(function(err, res) {
    if (err) return console.error(err);
      if(res.body.results.length === 0) {
        console.log('No results found');
      } else {
        console.log('Results found. Here they are:');
        const lat = res.body.results[0].geometry.location.lat,
              lng = res.body.results[0].geometry.location.lng;
        MemberUtils.findMember(lat, lng);
      }
    });
  },
  flush: function() {
    AppDispatcher.handleViewAction({
      actionType: SenateConstants.FLUSH_STORE
    });
  }
};
