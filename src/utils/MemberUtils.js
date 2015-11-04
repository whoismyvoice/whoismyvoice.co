import request from 'superagent';
import SenateServerActions from '../actions/SenateServerActions';
import SenateConstants from '../constants/SenateConstants';

module.exports = {
  findMember: function(lat, lng) {

    const bill = 'https://congress.api.sunlightfoundation.com/votes?bill_id='+ SenateConstants.BILL_ID +'&fields=voter_ids&apikey='+ SenateConstants.API_KEY;

    request
    .get(bill)
    .set('Accept', 'application/json')
    .end(function(err, res) {
      if (err) return console.error(err);
      let voters = res.body.results[0].voter_ids;
      if(res.body.results.length > 0) {
        let voteId = JSON.stringify(voters);

        getDetails(voters,lat,lng);
      }
    });
  }
};

let getDetails = function(voters,lat,lng) {

  const api = 'https://congress.api.sunlightfoundation.com/legislators/locate?latitude='+ lat +'&longitude='+ lng +'&apikey='+ SenateConstants.API_KEY;

  request
  .get(api)
  .set('Accept', 'application/json')
  .end(function(err, res) {
    if (err) return console.error(err);

    let senators = res.body.results.filter(function(senator) {
      if(senator.chamber === SenateConstants.CHAMBER) {

        var dynamic
        console.log(senator.bioguide_id in voters);
        console.log(voters[senator.bioguide_id]);
        return senator
      }
    });

    if (res.body.results.length === 0) {
      SenateServerActions.getDetails('error');
    } else if (senators.length > 0) {
      SenateServerActions.getDetails(senators);
    }
  });
};


