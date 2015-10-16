import SenateServerActions from '../actions/SenateServerActions';
import SenateGetRandomActions from '../actions/SenateGetRandomActions';
import votedFor from '../data/votedFor';
import request from 'superagent';

module.exports = {
  getMember: function(lat,lng) {

    // Check if there was an error parsing zip code
    if(lat === 'error' && lng === undefined) {
      SenateServerActions.getDetails('error');
    } else {

      // Set apiKey and api
      const apikey = '4f501d505d514b85a01f39d4ceb9a353';
      var api;

      // Decipher whether user passed a State or a zip code
      if(isNaN(lat)) {
        api = 'https://congress.api.sunlightfoundation.com/legislators?state=' + lat + '&apikey=' + apikey;
      } else {
        api = 'https://congress.api.sunlightfoundation.com/legislators/locate?latitude=' + lat + '&longitude=' + lng + '&apikey=' + apikey;
      }

      // Request Sunlight Foundation API to get further details about congress person
      // When details have been retrieved call SenateServerActions w. response body object
      request
        .get(api)
        .set('Accept', 'application/json')
        .end(function(err, res) {
          if(err) return console.error(err);

          var bioguide = res.body.results[0].bioguide_id;
          //console.log(res.body.results);

          if(votedFor.indexOf(bioguide) > -1) {
            SenateServerActions.getDetails(res.body);
          } else {
            SenateGetRandomActions.getRandomMember();
          }
        });
    }
  }
};
	