var SenateActions = require('../actions/SenateActions');
var request = require('superagent');

module.exports = {
  get: function(zip_code) {
    var place;

    request
      .get('http://api.zippopotam.us/us/'+zip_code)
      .set('Accept', 'application/json')
      .end(function(err, res) {
        if(err) return console.error(err);

        place = res.body.places[0];
        console.log('RETURNED OBJECT: ');
        console.log(place);
      });

    return place;
  }
};
	