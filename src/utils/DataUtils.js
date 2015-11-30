import SenateServerActions from '../actions/SenateServerActions';
import request from 'superagent';

module.exports = {
  saveFetchedData: () => {
    const url = '/api/settings';
    request
    .get(url)
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err) return console.error(err);
      if (res.body.settings.length !== 0) {
        SenateServerActions.fetchSettings(res.body.settings);
      }
    });
  }
};
