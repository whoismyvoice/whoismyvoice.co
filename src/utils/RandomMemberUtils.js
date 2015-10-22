import SenateServerActions from '../actions/SenateServerActions';
import SenateGetRandomActions from '../actions/SenateGetRandomActions';
import HFCMembers from '../data/HFCMembers';
import request from 'superagent';

module.exports = {
  getRandomMember: function() {

    // Get random id from HFCMembers array to insert into API call
    const ranId = Math.floor(Math.random() * HFCMembers.length); 
    const randomMember = HFCMembers[ranId].bioguide;

    // Set apiKey and api
    const apikey = '4f501d505d514b85a01f39d4ceb9a353';
    const api = 'http://congress.api.sunlightfoundation.com/legislators?bioguide_id='+randomMember+'&apikey='+apikey;
    const hfc = true;

    // Request Sunlight Foundation API to get further details about congress person
    // When details have been retrieved call SenateServerActions w. response body object

    request
      .get(api)
      .set('Accept', 'application/json')
      .end(function(err, res) {
        if(err) return console.error(err);
        SenateServerActions.getDetails(res.body.results, hfc);
      });
  }
};
	