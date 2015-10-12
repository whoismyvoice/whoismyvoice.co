import SenateServerActions from '../actions/SenateServerActions';
import request from 'superagent';

module.exports = {
  getMember: function(lat,lng) {

    // Set apiKey and api
    const apikey = '4f501d505d514b85a01f39d4ceb9a353';
    const api = 'https://congress.api.sunlightfoundation.com/legislators/locate?latitude=' + lat + '&longitude=' + lng + '&apikey=' + apikey;

    // Request Sunlight Foundation API to get further details about congress person
    // When details have been retrieved call SenateServerActions w. response body object
    request
      .get(api)
      .set('Accept', 'application/json')
      .end(function(err, res) {
        if(err) return console.error(err);

        SenateServerActions.getDetails(res.body);
      });
  }
};
	