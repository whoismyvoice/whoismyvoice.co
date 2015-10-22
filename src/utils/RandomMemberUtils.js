import SenateServerActions from '../actions/SenateServerActions';
import SenateGetRandomActions from '../actions/SenateGetRandomActions';
import HFCMembers from '../data/HFCMembers';
import request from 'superagent';

module.exports = {
  getRandomMember: function() {
    const hfc = true;
    SenateServerActions.getDetails(hfc, hfc);
  }
};
	