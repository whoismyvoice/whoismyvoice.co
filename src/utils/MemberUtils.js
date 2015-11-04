import request from 'superagent';
import SenateServerActions from '../actions/SenateServerActions';

module.exports = {
  findMember: function(lat, lng) {

    console.log(lat);
    console.log(lng);

    const chamber = 'house';
    const apikey = '4f501d505d514b85a01f39d4ceb9a353';
    const api = 'https://congress.api.sunlightfoundation.com/legislators/locate?latitude='+ lat +'&longitude='+ lng +'&apikey=' + apikey;

    console.log(api);

    request
    .get(api)
    .set('Accept', 'application/json')
    .end(function(err, res) {
      if (err) return console.error(err);

      console.log(res.body);

      let senators = res.body.results.filter(function(senator) {
        if(senator.chamber === chamber) {

          console.log(senator);
          return senator
        }
      });

      if (res.body.results.length === 0) {
        SenateServerActions.getDetails('error');
      } else if (senators.length > 0) {
        if(senators.length > 1) {
          console.log("More than 1 congress man, prompt for street name");
        }
        SenateServerActions.getDetails(senators);
      }
    });
  }
};
