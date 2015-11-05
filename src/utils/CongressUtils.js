import SenateServerActions from '../actions/SenateServerActions';
import request from 'superagent';
import SenateConstants from '../constants/SenateConstants';

module.exports = {
  getMember: function(zip_code, lng) {
    // Check if there was an error parsing zip code
    if (zip_code === 'error') {
      SenateServerActions.getDetails('error');
    } else {
      const bill = 'https://congress.api.sunlightfoundation.com/votes?bill_id='+ SenateConstants.BILL_ID +'&fields=voter_ids&apikey='+ SenateConstants.API_KEY;

      request
      .get(bill)
      .set('Accept', 'application/json')
      .end(function(err, res) {
        if (err) return console.error(err);
        getMemberDetails(zip_code, lng, res.body.results[0].voter_ids);
      });
    }
  }
};

let getMemberDetails = function(zip_code, lng, voters) {

  let api = lng !== undefined ? 'https://congress.api.sunlightfoundation.com/legislators/locate?latitude='+ zip_code +'&longitude='+ lng +'&apikey='+ SenateConstants.API_KEY : 'https://congress.api.sunlightfoundation.com/legislators/locate?zip=' + zip_code + '&apikey=' + SenateConstants.API_KEY;

  request
  .get(api)
  .set('Accept', 'application/json')
  .end(function(err, res) {
    if (err) return console.error(err);

    let senators = res.body.results.filter(function(senator) {
      if(senator.chamber === SenateConstants.CHAMBER && senator.bioguide_id in voters) {
        senator.voted = voters[senator.bioguide_id];
        senator.full_name = senator.middle_name === null ? senator.first_name +' '+ senator.last_name : senator.first_name +' '+ senator.middle_name +' '+ senator.last_name;
        senator.age = (new Date().getFullYear()-senator.birthday.substring(0,4));
        return senator
      }
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
};
