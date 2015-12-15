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
        member.age = (new Date().getFullYear() - member.birthday.substring(0, 4));
        member.full_name = member.middle_name === null ? `${member.first_name} ${member.last_name}` : `${member.first_name} ${member.middle_name} ${member.last_name}`;
        member.gender_full = member.gender === 'M' ? 'man' : 'woman';
        if (senate_votes[member.bioguide_id]) {
          member.voted = senate_votes[member.bioguide_id];
          member.vote_favor = senate_votes[member.bioguide_id] === Settings.senate_vote_favor;
        } else {
          member.voted = house_votes[member.bioguide_id];
          member.vote_favor = house_votes[member.bioguide_id] === Settings.house_vote_favor;
          house_members++;
        }
        return member;
      }
    });

    // Sort array of objects based on vote_favor value in order to show members who voted as set vote_favor first
    const sort_member = function(left, right) {
      const vote_order = left.vote_favor === right.vote_favor ? 0 : (left.vote_favor < right.vote_favor ? -1 : 1);
      if (
        (left.vote_favor && right.vote_favor) || (!left.vote_favor && !right.vote_favor)
      ) {
        return vote_order;
      } else if (left.vote_favor) {
        return -1;
      } else {
        return 1;
      }
    };

    if (res.body.results.length === 0) {
      SenateServerActions.getDetails('error');
    } else if (members.length > 0) {
      SenateServerActions.getDetails(members.sort(sort_member), members.length, house_members);
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
