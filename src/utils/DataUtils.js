import SenateServerActions from '../actions/SenateServerActions';
import request from 'superagent';
import SenateConstants from '../constants/SenateConstants';

module.exports = {
  saveFetchedData: () => {
    const url = '/api/settings';
    request
    .get(url)
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err) return console.error(err);
      if(res.body.settings.length === 0) {
        console.log("Could not retrieve settings")
      } else {
        SenateServerActions.fetchSettings(res.body.settings);
      }
    });
  }
};
