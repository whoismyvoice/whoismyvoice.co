import SenateServerActions from '../actions/SenateServerActions';
import request from 'superagent';
import SenateConstants from '../constants/SenateConstants';
import SettingsJSON from '../data/settings.json';
import SenateStore from '../stores/SenateStore';

const Settings = process.env.NODE_ENV !== 'production' ? SettingsJSON : SenateStore.getSettings();

const getMemberDetails = (zipCode, lng, voters) => {
  const {API_KEY} = SenateConstants,
        url = lng !== undefined ? `https://congress.api.sunlightfoundation.com/legislators/locate?latitude=${zipCode}&longitude=${lng}&apikey=${API_KEY}`: `https://congress.api.sunlightfoundation.com/legislators/locate?zip=${zipCode}&apikey=${API_KEY}`,
        {bill_id, vote_favor} = Settings;

  request
  .get(url)
  .set('Accept', 'application/json')
  .end((err, res) => {
    if (err) return console.error(err);
    const senators = res.body.results.filter(senator => {
      const filter = bill_id[0] === 's' ? voters[senator.bioguide_id] === vote_favor : true;
      if (senator.chamber[0] === bill_id[0] && filter && senator.bioguide_id in voters) {
        senator.voted = voters[senator.bioguide_id];
        senator.full_name = senator.middle_name === null ? `${senator.first_name} ${senator.last_name}` : `${senator.first_name} ${senator.middle_name} ${senator.last_name}`;
        senator.gender_full = senator.gender === 'M' ? 'man' : 'woman';
        senator.age = (new Date().getFullYear() - senator.birthday.substring(0, 4));
        return senator;
      }
    });
    if (res.body.results.length === 0) {
      SenateServerActions.getDetails('error');
    } else if (senators.length === 0 && bill_id[0] === 's') {
      // If senators = 0, none voted against the vote_favor
      // Instead the 1-2 senators who voted as the vote_favor should be passed to the store
      const voteFilter = vote_favor === 'Yea' ? 'Nay' : 'Yea';

      const newSenators = res.body.results.filter(senator => {
        if (senator.chamber[0] === bill_id[0] && voters[senator.bioguide_id] === voteFilter) {
          senator.voted = voters[senator.bioguide_id];
          senator.full_name = senator.middle_name === null ? `${senator.first_name} ${senator.last_name}` : `${senator.first_name} ${senator.middle_name} ${senator.last_name}`;
          senator.gender_full = senator.gender === 'M' ? 'man' : 'woman';
          senator.age = (new Date().getFullYear() - senator.birthday.substring(0, 4));
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
      const bill = 'https://congress.api.sunlightfoundation.com/votes?bill_id=' + Settings.bill_id + '&fields=voter_ids&apikey=' + SenateConstants.API_KEY;
      request
      .get(bill)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) return console.error(err);
        if (res.body.results.length === 0) {
          SenateServerActions.getDetails('error');
        } else {
          getMemberDetails(zipCode, lng, res.body.results[0].voter_ids);
        }
      });
    }
  }
};
