import request from 'superagent';
import SenateServerActions from '../actions/SenateServerActions';
import SenateConstants from '../constants/SenateConstants';
import {Settings} from '../constants/SenateConstants';

const getMemberDetails = (zipCode, lng, senate_votes, house_votes) => {
  const {API_KEY} = SenateConstants,
    url = lng !== undefined ? `https://congress.api.sunlightfoundation.com/legislators/locate?latitude=${zipCode}&longitude=${lng}&apikey=${API_KEY}` : `https://congress.api.sunlightfoundation.com/legislators/locate?zip=${zipCode}&apikey=${API_KEY}`,
    {vote_favor} = Settings;

  request
  .get(url)
  .set('Accept', 'application/json')
  .end((err, res) => {
    if (err) return console.error(err);
    let house_members = 0;
    const members = res.body.results.filter(member => {
      if (member.bioguide_id in senate_votes || member.bioguide_id in house_votes) {
        if (senate_votes[member.bioguide_id]) {
          member.voted = senate_votes[member.bioguide_id];
        } else {
          member.voted = house_votes[member.bioguide_id];
          house_members++;
        }
        member.age = (new Date().getFullYear() - member.birthday.substring(0, 4));
        member.full_name = member.middle_name === null ? `${member.first_name} ${member.last_name}` : `${member.first_name} ${member.middle_name} ${member.last_name}`;
        member.gender_full = member.gender === 'M' ? 'man' : 'woman';
        return member;
      }
    });
    if (res.body.results.length === 0) {
      SenateServerActions.getDetails('error');
    } else if (members.length > 0) {
      SenateServerActions.getDetails(members, members.length, house_members);
    }
  });
};

const getHouseVotes = (zipCode, lng, senate_votes) => {
  const {bill_id} = Settings;

  const bill = `https://congress.api.sunlightfoundation.com/votes?chamber=house&bill_id=${bill_id}&fields=voter_ids&apikey=${SenateConstants.API_KEY}`;
  request
  .get(bill)
  .set('Accept', 'application/json')
  .end((err, res) => {
    if (err) return console.error(err);
    if (res.body.results.length === 0) {
      SenateServerActions.getDetails('error');
    } else {
      getMemberDetails(zipCode, lng, senate_votes, res.body.results[0].voter_ids);
    }
  });
};

module.exports = {
  getMember: (zipCode, lng) => {
    const {bill_id} = Settings;
    // Check if there was an error parsing zip code
    if (zipCode === 'error') {
      SenateServerActions.getDetails('error');
    } else {
      const bill = `https://congress.api.sunlightfoundation.com/votes?chamber=senate&bill_id=${bill_id}&fields=voter_ids&apikey=${SenateConstants.API_KEY}`;
      request
      .get(bill)
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) return console.error(err);
        if (res.body.results.length === 0) {
          SenateServerActions.getDetails('error');
        } else {
          getHouseVotes(zipCode, lng, res.body.results[0].voter_ids);
        }
      });
    }
  }
};
