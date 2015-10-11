import AppDispatcher from '../dispatcher/AppDispatcher';
import SenateConstants from '../constants/SenateConstants';
import request from 'superagent';

module.exports = {

	identifyMember: function(zip_code) {
		AppDispatcher.handleViewAction({
			actionType: SenateConstants.FIND_MEMBER,
      zip_code: zip_code
		});
    // API CALL
    console.log('PASSING ZIP: ' + zip_code);

    var place;

    request
      .get('http://api.zippopotam.us/us/'+zip_code)
      .set('Accept', 'application/json')
      .end(function(err, res) {
        if(res.ok) {
          place = res.body.places[0];
          console.log('RETURNED OBJECT: ');
          console.log(place);
        } else {
          console.log("Not able to retrieve ZIP information");
        }
      });
    return place
	}

};