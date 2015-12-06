import SenateServerActions from '../actions/SenateServerActions';
import SenateConstants from '../constants/SenateConstants';
import request from 'superagent';
import SettingsJSON from '../data/settings.json';

const Settings = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development' ? SettingsJSON : SenateStore.getSettings();
let memberData = [];
let memberSponsors = [];

const identifyCommittee = (item) => {
  const api = `https://api.open.fec.gov/v1/candidate/${item.fec_ids[0]}/committees/?sort_nulls_large=true&api_key=Uyo5q24jY9uV1xXywsFV7yg2tVIJ7yKEjA3OCEl9&page=1&per_page=20&designation=P&sort=name&sort_hide_null=true`;
  return new Promise(function idPromise(resolve, reject) {
    request
    .get(api)
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err) return console.error(err);
      const com_id = res.body.results[0].committee_id;
      item.commitee_id = com_id;
      const member = item;
      resolve(member);
    });
  }).then(function(member) {
    identifyPayment(member);
  });
};

const identifyPayment = (member) => {
  const url = `https://api.open.fec.gov/v1/committee/${member.commitee_id}/schedules/schedule_a/by_contributor/?sort_nulls_large=true&api_key=Uyo5q24jY9uV1xXywsFV7yg2tVIJ7yKEjA3OCEl9&page=1&contributor_id=C00053553&per_page=20&cycle=2014`;
  return new Promise (function testPromise(resolve, reject) {
    request
    .get(url)
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err) return console.error(err);
        const payment = res.body.results[0] ? res.body.results[0].total : 'undefined';
        member.payment = payment;
        const relevant = [member];
        resolve(relevant);
    });
  }).then(function(relevant) {
    SenateServerActions.getDetails(relevant, relevant.length);
  });
};

const testArr = (arr) => {
  return Promise.all(arr.filter(function(item) {
    return identifyCommittee(item);
  }))
}

module.exports = {
  getSponsorDetails: (ZIP_CODE, lng) => {
    const {API_KEY} = SenateConstants,
          url = lng !== undefined ? `https://congress.api.sunlightfoundation.com/legislators/locate?latitude=${ZIP_CODE}&longitude=${lng}&apikey=${API_KEY}`: `https://congress.api.sunlightfoundation.com/legislators/locate?zip=${ZIP_CODE}&apikey=${API_KEY}`;

    request
    .get(url)
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err) return console.error(err);
      const members = res.body.results.filter((member) => {
        if (member.chamber[0] === Settings.chamber[0]) {
          member.voted = 'yea';
          member.full_name = member.middle_name === null ? `${member.first_name} ${member.last_name}` : `${member.first_name} ${member.middle_name} ${member.last_name}`;
          member.gender_full = member.gender === 'M' ? 'man' : 'woman';
          return member;
        }
      });
      if(members.length !== 0) {
        testArr(members);
      }
    });
  },

};
