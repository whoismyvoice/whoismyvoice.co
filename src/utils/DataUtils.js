import SenateServerActions from '../actions/SenateServerActions';
var request = require('superagent-cache')();

module.exports = {
  saveFetchedData: () => {
    const url = '/api/settings';
    request
    .get(url)
    .cacheWhenEmpty(false)
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err) return console.error(err);
      if (res.body.settings.length !== 0) {
        SenateServerActions.fetchSettings(res.body.settings);
      }
    });
  }
};
