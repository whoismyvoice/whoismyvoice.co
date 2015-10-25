import SenateServerActions from '../actions/SenateServerActions';
import votedFor from '../data/votedFor';
import request from 'superagent';

module.exports = {
  getMember: function(zip_code) {

    // Check if there was an error parsing zip code
    if(zip_code === 'error') {
      SenateServerActions.getDetails('error');
    } else {

      const apikey = '4f501d505d514b85a01f39d4ceb9a353';
      var api;

      // Decipher whether user passed a State or a zip code
      if(isNaN(zip_code)) {
        api = 'https://congress.api.sunlightfoundation.com/legislators?state=' + zip_code + '&apikey=' + apikey;
      } else {
        api = 'https://congress.api.sunlightfoundation.com/legislators/locate?zip=' + zip_code + '&apikey=' + apikey;
      }

      // Request Sunlight Foundation API to get further details about congress person
      // When details have been retrieved call SenateServerActions w. response body object
      request
        .get(api)
        .set('Accept', 'application/json')
        .end(function(err, res) {
          if(err) return console.error(err);

          var senators = res.body.results.filter(function(senator) {
            if((senator.chamber === 'senate') && (votedFor.indexOf(senator.bioguide_id)) > -1) {
              return senator
            }
          });

          if(res.body.results.length === 0) {
            SenateServerActions.getDetails('error');
          } else if(senators.length > 0) {
            SenateServerActions.getDetails(senators);
          } else {
            SenateServerActions.getRandomMember();
          }
        });
    }
  }
};
	