import request from 'superagent';
import SenateServerActions from '../actions/SenateServerActions';
import SenateConstants from '../constants/SenateConstants';
import {Settings} from '../constants/SenateConstants';

import SenateStore from '../stores/SenateStore';
let members = [];
let house_members = 0;

// Promise retrieving amount of money sponsored by NRA to commitee for cycle 2014
const identifyPayment = (member) => {
  const url = `https://api.open.fec.gov/v1/committee/${member.commitee_id}/schedules/schedule_a/by_contributor/?sort_nulls_large=true&api_key=Uyo5q24jY9uV1xXywsFV7yg2tVIJ7yKEjA3OCEl9&page=1&contributor_id=${Settings.sponsor_id}&per_page=20&cycle=${Settings.sponsor_year}`;
  return new Promise(function testPromise(resolve, reject) {
    request
    .get(url)
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err) {
        reject(SenateServerActions.getDetails('error'));
      }
      if (res.body.results) {
        const payment = res.body.results[0] ? res.body.results[0].total : 0;
        member.payment = payment;
        if (member.chamber === 'house') {
          house_members++;
        }
        const relevant = member;
        resolve(relevant);
      } else {
        reject(SenateServerActions.getDetails('error'));
      }
    });
  });
};

// Promise identifying the Committee for each member
const identifyCommittee = (item) => {
  // Check if did_search is false, and if so truncate it
  if (!SenateStore.getMember.did_search) {
    members.length = 0;
    house_members = 0;
  }

  const api = `https://api.open.fec.gov/v1/candidate/${item.fec_ids[0]}/committees/?sort_nulls_large=true&api_key=${SenateConstants.FEC_API_KEY}&page=1&per_page=20&designation=P&sort=name&sort_hide_null=true`;
  return new Promise(function idPromise(resolve, reject) {
    request
    .get(api)
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err) {
        reject(SenateServerActions.getDetails('error'));
      }
      if (res.body.results) {
        const com_id = res.body.results[0].committee_id;
        item.commitee_id = com_id;
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
    SenateServerActions.getDetails(members, members.length, house_members);
  });
};

const memberState = (member) => {
  member.voted = 'Yea';
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
      url = lng !== undefined ? `https://congress.api.sunlightfoundation.com/legislators/locate?latitude=${ZIP_CODE}&longitude=${lng}&apikey=${API_KEY}` : `https://congress.api.sunlightfoundation.com/legislators/locate?zip=${ZIP_CODE}&apikey=${API_KEY}`;

    request
    .get(url)
    .set('Accept', 'application/json')
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
