import AppDispatcher from '../dispatcher/AppDispatcher';
import SenateServerActions from '../actions/SenateServerActions';
import SenateConstants from '../constants/SenateConstants';
import request from 'superagent';
import SponsorUtils from '../utils/SponsorUtils';
import {Settings} from '../constants/SenateConstants';

module.exports = {
  fetchDistricts: ZIP_CODE => {
    AppDispatcher.handleViewAction({
      actionType: SenateConstants.FIND_MEMBER,
      zip_code: ZIP_CODE
    });
    SponsorUtils.getSponsorDetails(ZIP_CODE);
  },

  fetchSpecificMember: (ADDRESS, ZIP, STATE) => {
    AppDispatcher.handleViewAction({
      actionType: SenateConstants.FIND_SPECIFIC_MEMBER,
      address: ADDRESS,
      zip_code: ZIP,
      state: STATE
    });
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${ADDRESS},${ZIP} ${STATE}&components=country:US|postal_code:${ZIP}&key=${SenateConstants.GOOGLE_API_KEY}`;
    request
    .get(url)
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err) return console.error(err);
      if (res.body.results.length === 0) {
        SenateServerActions.getDetails('error');
      } else {
        const lat = res.body.results[0].geometry.location.lat,
          lng = res.body.results[0].geometry.location.lng;
        SponsorUtils.getSponsorDetails(lat, lng);
      }
    });
  },
  flush: (STORE) => {
    AppDispatcher.handleViewAction({
      actionType: SenateConstants.FLUSH_STORE,
      store: STORE
    });
  }
};
