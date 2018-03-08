import fetch from 'isomorphic-fetch';

import {
  RECEIVE_ADDRESS,
  RECEIVE_CONTRIBUTION_DATA,
  RECEIVE_OFFICIALS,
  RECEIVE_OFFICIALS_ALL,
  RECEIVE_ZIP_CODE,
  RESET_CURRENT,
} from './types';

// TODO: Environment variables
const GOOGLE_CIVIC_API_KEY = 'AIzaSyDE8_fr_0gztEPxpor0NFTCeRkkafpTDDA';
const ORGANIZATION = 'National Rifle Association';
const ELECTION_CYCLE = '2016|2018';

/**
 * Match FEC ids for house and senate races. Potentially important because some
 * of these candidates may run for other offices (e.g. President) and we are not
 * interested in those contributions.
 */
const FEC_ID_REGEX = /[HS]\d{1,3}[A-Z]{2}\d+/;

/**
 * Retrieve aggregated contribution data for given `organization` and `legislator`.
 * @param {string} organization name whose contributions will be searched.
 * @param {object} legislator for whom data will be retrieved.
 * @param {object} legislator.id object of identifiers for the `legislator`.
 * @param {array} legislator.id.fec string identifiers for FEC filings.
 * @returns contribution data.
 */
async function fetchContributionsForCandidate(organization, legislator) {
  const candidateFecIds = legislator.id.fec.filter(fecId => FEC_ID_REGEX.test(fecId));
  const baseUrl = 'https://v5qc8mdc1h.execute-api.us-east-1.amazonaws.com/production/maplight';
  const electionCycle = encodeURIComponent(ELECTION_CYCLE);
  const organizationName = encodeURIComponent(organization);
  const fecIds = encodeURIComponent(candidateFecIds.join('|'));
  const params = `cycle=${electionCycle}&fecIds=${fecIds}&organization=${organizationName}`;
  const url = `${baseUrl}?${params}`;
  const response = await fetch(url, {
    mode: 'cors',
    headers: {
      'Content-Type': 'text/plain',
    },
  });
  if (response.ok) {
    const body = await response.json();
    const contributionData = body.data;
    return contributionData;
  } else {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

/**
 * Retrieve data about officials/representatives based the provided address.
 * @param {string} address to use in lookup.
 * @returns array of officials.
 */
async function fetchOfficialsForAddress(address) {
  const baseUrl = 'https://www.googleapis.com/civicinfo/v2/representatives';
  const configParams = 'levels=country&roles=legislatorLowerBody&roles=legislatorUpperBody&includeOffices=true'
  const encodedAddress = encodeURIComponent(address);
  const params = `key=${GOOGLE_CIVIC_API_KEY}&address=${encodedAddress}&${configParams}`;
  const response = await fetch(`${baseUrl}?${params}`);
  if (response.ok) {
    const body = await response.json();
    const officials = body.officials;
    return officials;
  } else {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

/**
 * Retreive data about officials/legislators for the current legislative session.
 * @returns array of officials.
 */
async function fetchLegislatorsAll() {
  const url = 'https://theunitedstates.io/congress-legislators/legislators-current.json';
  const response = await fetch(url);
  if (response.ok) {
    const body = await response.json();
    const officials = body;
    return officials;
  } else {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

async function getLegislatorForOfficial(allLegislators, official) {
  return allLegislators.find((legislator) => legislator.name.official_full === official.name);
}

/**
 * Create action to notify address has been set.
 * @param {array} address received.
 * @returns action.
 */
export function receiveAddress(address) {
  return {
    type: RECEIVE_ADDRESS,
    address,
  };
}

/**
 * Create action to notify of contribution data received.
 * @param {object} legislator for whom data was received.
 * @param {object} legislator.name object of name information for the `legislator`.
 * @param {array} legislator.name.official_full official full name of the legislator
 *    according to FEC records.
 * @param {object} contributionData received from Maplight API
 * @param {array} contributionData.aggregate_totals grouped by ????. Each member
 *    has a `total_amount` property that is the aggregated value of contributions.
 * @returns action.
 */
function receiveContributionDataForLegislator(legislator, contributionData) {
  return receiveContributionData(
    legislator.name.official_full,
    contributionData.aggregate_totals[0].total_amount
  );
}

/**
 * Create action to notify of contribution data received.
 * @param {string} legislatorId official full name of the legislator
 *    according to FEC records.
 * @param {number} amount received in contributions.
 * @returns action.
 */
export function receiveContributionData(legislatorId, amount) {
  return {
    type: RECEIVE_CONTRIBUTION_DATA,
    amount,
    legislatorId,
  }
}

/**
 * Create action to notify officials retrieved.
 * @param {array} officials received.
 * @returns action.
 */
export function receiveOfficials(officials) {
  return {
    type: RECEIVE_OFFICIALS,
    officials,
  };
}

/**
 * Create action to notify officials retrieved.
 * @param {array} officials received.
 * @returns action.
 */
export function receiveOfficialsAll(officials) {
  return {
    type: RECEIVE_OFFICIALS_ALL,
    officials,
  };
}

/**
 * Create action to notify address has been set.
 * @param {array} address received.
 * @returns action.
 */
export function receiveZipCode(zipCode) {
  return {
    type: RECEIVE_ZIP_CODE,
    zipCode,
  };
}

/**
 * Create action to reset current state.
 * @returns action.
 */
export function reset() {
  return {
    type: RESET_CURRENT,
  };
}

/**
 * Asynchronously dispatch updates to zip code and address.
 */
export function setZipCode(zipCode) {
  return async dispatch => {
    dispatch(receiveZipCode(zipCode));
    setAddress(zipCode)(dispatch);
  };
}

/**
 * Asynchronously dispatch updates to address.
 */
export function setAddress(address) {
  return async dispatch => {
    dispatch(receiveAddress(address));
    const allLegislators = await fetchLegislatorsAll();
    const currentOfficials = await fetchOfficialsForAddress(address);
    dispatch(receiveOfficialsAll(allLegislators));
    dispatch(receiveOfficials(currentOfficials));
    const getLegislator = getLegislatorForOfficial.bind(this, allLegislators);
    const currentLegislators = await Promise.all(currentOfficials.map(official => getLegislator(official)));
    currentLegislators.forEach(async legislator => {
      const contributionData = await fetchContributionsForCandidate(ORGANIZATION, legislator);
      dispatch(receiveContributionDataForLegislator(legislator, contributionData));
    });
  };
}