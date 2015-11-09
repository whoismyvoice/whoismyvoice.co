import SenateServerActions from '../actions/SenateServerActions';
import request from 'superagent';
import SenateConstants from '../constants/SenateConstants';

module.exports = {
  getMember: function(zipCode, lng) {
    // Check if there was an error parsing zip code
    if (zipCode === 'error') {
      SenateServerActions.getDetails('error');
    } else {
      const bill = 'https://congress.api.sunlightfoundation.com/votes?bill_id=' + SenateConstants.BILL_ID + '&fields=voter_ids&apikey=' + SenateConstants.API_KEY;
      request
      .get(bill)
      .set('Accept', 'application/json')
      .end(function(err, res) {
        if (err) return console.error(err);
        getMemberDetails(zipCode, lng, res.body.results[0].voter_ids);
      });
    }
  }
};

const getMemberDetails = function(zipCode, lng, voters) {
  const api = lng !== undefined ? 'https://congress.api.sunlightfoundation.com/legislators/locate?latitude=' + zipCode + '&longitude=' + lng + '&apikey=' + SenateConstants.API_KEY : 'https://congress.api.sunlightfoundation.com/legislators/locate?zip=' + zipCode + '&apikey=' + SenateConstants.API_KEY;

  request
  .get(api)
  .set('Accept', 'application/json')
  .end(function(err, res) {
    if (err) return console.error(err);
    const senators = res.body.results.filter(function(senator) {
      const filter = SenateConstants.CHAMBER === 'senate' ? voters[senator.bioguide_id] === SenateConstants.VOTE_AGAINST : true;
      if (senator.chamber === SenateConstants.CHAMBER && filter && senator.bioguide_id in voters) {
        senator.voted = voters[senator.bioguide_id];
        senator.full_name = senator.middle_name === null ? senator.first_name + ' ' + senator.last_name : senator.first_name + ' ' + senator.middle_name + ' ' + senator.last_name;
        senator.gender_full = senator.gender === 'M' ? 'man' : 'woman';
        senator.age = (new Date().getFullYear() - senator.birthday.substring(0, 4));
        return senator;
      }
    });
    if (res.body.results.length === 0) {
      SenateServerActions.getDetails('error');
    } else if (senators.length > -1) {
      SenateServerActions.getDetails(senators, senators.length);
    }
  });
};
