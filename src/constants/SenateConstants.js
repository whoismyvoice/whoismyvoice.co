import SettingsJSON from '../data/settings.json';
import SenateStore from '../stores/SenateStore';

// Senate Constants
module.exports = Object.freeze({
  FIND_MEMBER: 'FIND_MEMBER',
  GET_DETAILS: 'GET_DETAILS',
  IDENTIFY_SECTION: 'IDENTIFY_SECTION',
  SET_CURRENT_MEMBER: 'SET_CURRENT_MEMBER',
  FETCH_SETTINGS: 'FETCH_SETTINGS',
  FLUSH_STORE: 'FLUSH_STORE',
  GET_SCHEDULE_A: 'GET_SCHEDULE_A',
  FIND_SPECIFIC_MEMBER: 'FIND_SPECIFIC_MEMBER',
  API_KEY: '4f501d505d514b85a01f39d4ceb9a353',
  GOOGLE_API_KEY: 'AIzaSyBnbPmoDZCPvSCv9fJoX12qfr-FO936dZE',
  FEC_API_KEY: process.env.NODE_ENV === 'production' ? 'DNox4ZCBAUvyHH67DnZRxFO0utkiEPMgk1Wpu8mo' : 'innx28Lu1FThi9laPiVZNsXs4Y1egkY5a4eMl9H2',
  Settings: process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'development' ? SettingsJSON : SenateStore.getSettings()
});
