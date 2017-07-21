const request = require('superagent');
import SenateServerActions from '../actions/SenateServerActions';
import SenateConstants from '../constants/SenateConstants';
import {Settings} from '../constants/SenateConstants';

import SenateStore from '../stores/SenateStore';
let jsonp = require('superagent-jsonp');

// Keep track of members to be able to pass this on to SenateServerActions
let members = [];

// Keep track of number of house reps. If more than two ask user for street name
let house_members = 0;

// Keep track of number of reps/sen who got contributions to sort correctly
let membersContributedTo = 0;

// Promise retrieving amount of money sponsored by NRA to commitee for cycle 2014
const identifyPayment = (member) => {
  const url = `https://api.open.fec.gov/v1/committee/${Settings.sponsor_id}/schedules/schedule_b/by_recipient_id/?recipient_id=${member.committee_id}&per_page=20&page=1&api_key=${SenateConstants.FEC_API_KEY}&cycle=${Settings.sponsor_year}`;
  return new Promise(function testPromise(resolve, reject) {
    request
    .get(url)
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err) {
        reject(SenateServerActions.getDetails('error'));
      } else if (res.body.results) {
        const payment = res.body.results[0] ? res.body.results[0].total : 0;
        member.payment = payment;
        if (member.chamber === 'house') {
          house_members++;
        }
        if (payment > 0) {
          membersContributedTo++;
        }
        const relevant = member;
        resolve(relevant);
      } else {
        reject(SenateServerActions.getDetails('error'));
      }
    });
  });
};

// Sort array of objects based on payment value in order to show members who got a contribution first
const sort_member_vote = (left, right) => {
  const vote_order = left.payment === right.payment ? 0 : (left.payment > right.payment ? -1 : 1);
  if ((left.payment && right.payment) || (!left.payment && !right.payment)) {
    return vote_order;
  } else if (left.payment) {
    return -1;
  } else {
    return 1;
  }
};

// Sort array based on member's chambers in order to show representatives first if no contribution received
const sort_member_chamber = (a, b) => {
  if (a.chamber < b.chamber) return -1;
  if (a.chamber > b.chamber) return 1;
  return 0;
};

// Promise identifying the Committee for each member
const identifyCommittee = (item) => {
  // Check if did_search is false, and if so truncate it
  if (!SenateStore.getMember.did_search) {
    members.length = 0;
    house_members = 0;
    membersContributedTo = 0;
  }

  const api = `https://api.open.fec.gov/v1/candidate/${item.fec_ids[0]}/committees/?sort_nulls_large=true&api_key=${SenateConstants.FEC_API_KEY}&page=1&per_page=20&designation=P&sort=name&sort_hide_null=true`;
  return new Promise(function idPromise(resolve, reject) {
    request
    .get(api)
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err) {
        reject(SenateServerActions.getDetails('error'));
      } else if (res.body.results) {
        if (item.fec_ids[0] === 'H2TN05131') {
          item.committee_id = 'C00376665';
        } else if (item.fec_ids[0] === 'H8LA00017') {
          item.committee_id = 'C00451807';
        } else {
          if (res.body.results[0]) {
            item.committee_id = res.body.results[0].committee_id ? res.body.results[0].committee_id : '';
            item.committee_name = res.body.results[0].name;
          }
        }

        const member = item;
        resolve(member);
      } else {
        reject(SenateServerActions.getDetails('error'));
      }
    });
  }).then(function(member) {
    return Promise.resolve(identifyPayment(member));
  }).then(function(member) {
    members.push(member);
    return Promise.resolve(members);
  }).then(function() {
    // Check whether all members either received / didn't receive payment in order to use correct sort func
    const sort_members = membersContributedTo === 0 || membersContributedTo === 3 ? sort_member_chamber : sort_member_vote;
    SenateServerActions.getDetails(members.sort(sort_members), members.length, house_members);
  });
};

const memberState = (member) => {
  member.full_name = member.middle_name === null ? `${member.first_name} ${member.last_name}` : `${member.first_name} ${member.middle_name} ${member.last_name}`;
  member.gender_full = member.gender === 'M' ? 'man' : 'woman';
  identifyCommittee(member);
};

const filterMembers = (arr) => {
  return Promise.all(arr.filter(function(member) {
    return Promise.resolve(memberState(member));
  }));
};

module.exports = {
  getSponsorDetails: (ZIP_CODE, lng) => {
    const {API_KEY} = SenateConstants,
    url = lng !== undefined ? `https://congress.api.sunlightfoundation.com/legislators/locate?latitude=${ZIP_CODE}&longitude=${lng}&apikey=${API_KEY}&callback=callback` : `https://congress.api.sunlightfoundation.com/legislators/locate?zip=${ZIP_CODE}&apikey=${API_KEY}&callback=callback`;

    request
    .get(url)
    .set('Accept', 'application/json')
    .use(jsonp)
    .end((err, res) => {
      if (err) return console.error(err);
      if (res.body.results.length > 0) {
        filterMembers(res.body.results);
      } else {
        SenateServerActions.getDetails('error');
      }
    });
  }
};
