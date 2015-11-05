import SenateServerActions from '../actions/SenateServerActions';
import request from 'superagent';
import SenateConstants from '../constants/SenateConstants';

module.exports = {
  getMember: function(zip_code, congress) {
    // Check if there was an error parsing zip code
    if (zip_code === 'error') {
      SenateServerActions.getDetails('error');
    } else {
      let api = 'https://congress.api.sunlightfoundation.com/legislators/locate?zip=' + zip_code + '&apikey=' + SenateConstants.API_KEY;
      
      request
      .get(api)
      .set('Accept', 'application/json')
      .end(function(err, res) {
        if (err) return console.error(err);

        let senators = res.body.results.filter(function(senator) {
          return senator.chamber === SenateConstants.CHAMBER
        });

        if (res.body.results.length === 0) {
          SenateServerActions.getDetails('error');
        } else if (senators.length > 0) {
          if(senators.length > 1) {
            console.log("More than 1 congress man, prompt for street name");
          }
          SenateServerActions.getDetails(senators, senators.length);
        }
      });
    }
  }
};
