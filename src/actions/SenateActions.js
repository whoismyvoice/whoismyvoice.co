import AppDispatcher from '../dispatcher/AppDispatcher';
import SenateConstants from '../constants/SenateConstants';
import SenateStore from '../stores/SenateStore';
import request from 'superagent';
import CongressUtils from '../utils/CongressUtils';
import SponsorUtils from '../utils/SponsorUtils';
import SettingsJSON from '../data/settings.json';

const Settings = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development' ? SettingsJSON : SenateStore.getSettings();

module.exports = {
  fetchDistricts: ZIP_CODE => {
    AppDispatcher.handleViewAction({
      actionType: SenateConstants.FIND_MEMBER,
      zip_code: ZIP_CODE
    });
    if (Settings.sponsor) {
      SponsorUtils.getSponsorDetails(ZIP_CODE);
    } else {
      CongressUtils.getMember(ZIP_CODE);
    }
  },
  fetchSpecificMember: (ADDRESS, ZIP, STATE) => {
    AppDispatcher.handleViewAction({
      actionType: SenateConstants.FIND_SPECIFIC_MEMBER,
      address: ADDRESS,
      zip_code: ZIP,
      state: STATE
    });
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${ADDRESS},${ZIP} ${STATE}&components=country:US&key=${SenateConstants.GOOGLE_API_KEY}`;
    request
    .get(url)
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err) return console.error(err);
      if (res.body.results.length === 0) {
        CongressUtils.getMember('error');
      } else if (Settings.sponsor) {
        const lat = res.body.results[0].geometry.location.lat,
          lng = res.body.results[0].geometry.location.lng;
        SponsorUtils.getSponsorDetails(lat, lng);
      } else {
        const lat = res.body.results[0].geometry.location.lat,
          lng = res.body.results[0].geometry.location.lng;
        CongressUtils.getMember(lat, lng);
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
