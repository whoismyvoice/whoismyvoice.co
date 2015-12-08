import SenateServerActions from '../actions/SenateServerActions';
import request from 'superagent';
import SenateConstants from '../constants/SenateConstants';
import {Settings} from '../constants/SenateConstants';

const getMemberDetails = (zipCode, lng, voters) => {
  const {API_KEY} = SenateConstants,
        url = lng !== undefined ? `https://congress.api.sunlightfoundation.com/legislators/locate?latitude=${zipCode}&longitude=${lng}&apikey=${API_KEY}`: `https://congress.api.sunlightfoundation.com/legislators/locate?zip=${zipCode}&apikey=${API_KEY}`,
        { bill_id, vote_favor, chamber} = Settings;

  request
  .get(url)
  .set('Accept', 'application/json')
  .end((err, res) => {
    if (err) return console.error(err);
    const senators = res.body.results.filter(senator => {
      const filter = chamber[0] === 's' ? voters[senator.bioguide_id] === vote_favor : true;
      if (senator.chamber[0] === chamber[0] && filter && senator.bioguide_id in voters) {
        senator.voted = voters[senator.bioguide_id];
        senator.full_name = senator.middle_name === null ? `${senator.first_name} ${senator.last_name}` : `${senator.first_name} ${senator.middle_name} ${senator.last_name}`;
        senator.gender_full = senator.gender === 'M' ? 'man' : 'woman';
        return senator;
      }
    });
    if (res.body.results.length === 0) {
      SenateServerActions.getDetails('error');
    } else if (senators.length === 0 && chamber[0] === 's') {
      const voteFilter = vote_favor === 'Yea' ? 'Nay' : 'Yea';
      const newSenators = res.body.results.filter(senator => {
        if (senator.chamber[0] === chamber[0] && voters[senator.bioguide_id] === voteFilter) {
          senator.voted = voters[senator.bioguide_id];
          senator.full_name = senator.middle_name === null ? `${senator.first_name} ${senator.last_name}` : `${senator.first_name} ${senator.middle_name} ${senator.last_name}`;
          senator.gender_full = senator.gender === 'M' ? 'man' : 'woman';
          return senator;
        }
      });
      SenateServerActions.getDetails(newSenators, newSenators.length);
    } else if (senators.length > 0) {
      SenateServerActions.getDetails(senators, senators.length);
    }
  });
};

module.exports = {
  getMember: (zipCode, lng) => {
    // Check if there was an error parsing zip code
    if (zipCode === 'error') {
      SenateServerActions.getDetails('error');
    } else {
      const bill = 'https://congress.api.sunlightfoundation.com/votes?bill_id=' + bill_id + '&fields=voter_ids&apikey=' + SenateConstants.API_KEY;
      request
      .get(bill)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) return console.error(err);
        if (res.body.results.length === 0) {
          SenateServerActions.getDetails('error');
        } else if (!Settings.sponsor) {
          getMemberDetails(zipCode, lng, res.body.results[0].voter_ids);
        }
      });
    }
  }
};
