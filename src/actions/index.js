// @flow

import PropTypes from 'prop-types';
import fetch from 'isomorphic-fetch';
import mixpanel from 'mixpanel-browser';

import { ELECTION_CYCLE, EXECUTE_PROXY, ORGANIZATION } from '../constants';
import {
  RECEIVE_ADDRESS,
  RECEIVE_CONTRIBUTION_DATA,
  RECEIVE_OFFICIALS,
  RECEIVE_OFFICIALS_ALL,
  RECEIVE_OFFICIALS_ERROR,
  RECEIVE_ZIP_CODE,
  RESET_CURRENT,
  TOGGLE_MENU,
} from './types';
import { Legislator } from '../models/Legislator';
import { PropType as MaplightResultsType } from '../models/MaplightResults';
import { ResponseError } from '../models/ResponseError';

import type { Action } from './types';
import type {
  LegislatorIdentifier,
  LegislatorChannelRecord,
  LegislatorRecord,
} from '../models/Legislator';
import type { MaplightResultsRecord } from '../models/MaplightResults';

export type Dispatch = (Action | Promise<Action>) => void;

type OfficialAddressRecord = {
  line1: string,
  line2?: string,
  city: string,
  state: string,
  zip: string,
};

export type OfficialRecord = {
  name: string,
  address: Array<OfficialAddressRecord>,
  party: string,
  phones: Array<string>,
  urls: Array<string>,
  photoUrl: string,
  channels: Array<LegislatorChannelRecord>,
};

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
async function fetchContributionsForCandidate(
  organization: string,
  legislator: LegislatorRecord
): Promise<MaplightResultsRecord> {
  const candidateFecIds = legislator.id.fec.filter(fecId =>
    FEC_ID_REGEX.test(fecId)
  );
  const baseUrl = `${EXECUTE_PROXY}/maplight`;
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
    return body;
  } else {
    throw new ResponseError(response, response.statusText);
  }
}

/**
 * Retrieve data about officials/representatives based the provided address.
 * @param {string} address to use in lookup.
 * @returns array of officials.
 */
async function fetchOfficialsForAddress(
  address: string
): Promise<Array<OfficialRecord>> {
  const baseUrl = `${EXECUTE_PROXY}/civics`;
  const encodedAddress = encodeURIComponent(address);
  const params = `address=${encodedAddress}`;
  const response = await fetch(`${baseUrl}?${params}`);
  if (response.ok) {
    const body = await response.json();
    const officials = body.officials;
    return officials;
  } else {
    throw new ResponseError(response, response.statusText);
  }
}

/**
 * Retreive data about officials/legislators for the current legislative session.
 * @returns array of officials.
 */
async function fetchLegislatorsAll(): Promise<Array<LegislatorRecord>> {
  const url =
    'https://theunitedstates.io/congress-legislators/legislators-current.json';
  const response = await fetch(url);
  if (response.ok) {
    return await response.json();
  } else {
    throw new ResponseError(response, response.statusText);
  }
}

async function getLegislatorForOfficial(
  allLegislators: Array<LegislatorRecord>,
  official: OfficialRecord
): Promise<LegislatorRecord | void> {
  return allLegislators.find(
    legislator => Legislator.getIdentifier(legislator) === official.name
  );
}

/**
 * Create action to notify address has been set.
 * @param {array} address received.
 * @returns action.
 */
export function receiveAddress(address: string): Action {
  mixpanel.track(RECEIVE_ADDRESS);
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
 * @param {object} contributionResults received from Maplight API
 * @param {object} contributionResults.search_terms information about what was searched.
 * @param {object} contributionResults.search_terms.donor information about the donor
 *    search parameters
 * @param {object} contributionResults.search_terms.donor.donor_organization
 * @param {object} contributionResults.data result data.
 * @param {array} contributionResults.data.aggregate_totals grouped by ????. Each member
 *    has a `total_amount` property that is the aggregated value of contributions.
 * @returns action.
 */
function receiveContributionDataForLegislator(
  legislator: LegislatorRecord,
  contributionResults: MaplightResultsRecord
): Action {
  PropTypes.checkPropTypes(
    { contributionResults: MaplightResultsType },
    { contributionResults },
    'contributionResults',
    'actions#receiveContributionDataForLegislator'
  );
  return receiveContributionData(
    Legislator.getIdentifier(legislator),
    contributionResults.search_terms.donor.donor_organization,
    contributionResults.data.aggregate_totals[0].total_amount
  );
}

/**
 * Create action to notify of contribution data received.
 * @param {string} legislatorId official full name of the legislator
 *    according to FEC records.
 * @param {string} organization making the contribution.
 * @param {number} amount received in contributions.
 * @returns action.
 */
export function receiveContributionData(
  legislatorId: LegislatorIdentifier,
  organization: string,
  amount: number
): Action {
  mixpanel.track(RECEIVE_CONTRIBUTION_DATA, { legislatorId, organization });
  return {
    type: RECEIVE_CONTRIBUTION_DATA,
    amount,
    legislatorId,
    organization,
  };
}

/**
 * Create action to notify officials retrieved.
 * @param {array} officials received.
 * @returns action.
 */
export function receiveOfficials(officials: Array<OfficialRecord>): Action {
  mixpanel.track(RECEIVE_OFFICIALS);
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
export function receiveOfficialsAll(
  officials: Array<LegislatorRecord>
): Action {
  mixpanel.track(RECEIVE_OFFICIALS_ALL);
  return {
    type: RECEIVE_OFFICIALS_ALL,
    officials,
  };
}

/**
 * Create action to notify officials retrieved an error.
 * @param {error} error received.
 * @returns action.
 */
export async function receiveOfficialsError(
  error: ResponseError
): Promise<Action> {
  mixpanel.track(RECEIVE_OFFICIALS_ERROR);
  const response = error.response;
  // If this throws no error will be received.
  const body = await response.json();
  return {
    type: RECEIVE_OFFICIALS_ERROR,
    error: body.error,
  };
}

/**
 * Create action to notify address has been set.
 * @param {array} address received.
 * @returns action.
 */
export function receiveZipCode(zipCode: string): Action {
  return {
    type: RECEIVE_ZIP_CODE,
    zipCode,
  };
}

/**
 * Create action to reset current state.
 * @returns action.
 */
export function reset(): Action {
  mixpanel.track(RESET_CURRENT);
  return {
    type: RESET_CURRENT,
  };
}

/**
 * Create a TOGGLE_MENU action instance.
 * @returns action.
 */
export function toggleMenu(): Action {
  mixpanel.track(TOGGLE_MENU);
  return {
    type: TOGGLE_MENU,
  };
}

/**
 * Asynchronously dispatch updates to zip code and address.
 */
export function setZipCode(zipCode: string) {
  return async (dispatch: Dispatch) => {
    dispatch(receiveZipCode(zipCode));
    setAddress(zipCode)(dispatch);
  };
}

/**
 * Asynchronously dispatch updates to address.
 */
export function setAddress(address: string) {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(receiveAddress(address));
      const allLegislators = await fetchLegislatorsAll();
      const currentOfficials = await fetchOfficialsForAddress(address);
      dispatch(receiveOfficialsAll(allLegislators));
      dispatch(receiveOfficials(currentOfficials));
      const getLegislator = getLegislatorForOfficial.bind(this, allLegislators);
      const currentLegislators = await Promise.all(
        currentOfficials.map(official => getLegislator(official))
      );
      currentLegislators
        .filter(legislator => legislator !== undefined)
        .forEach(async legislator => {
          // Flow isn't recognizing `filter` as changing the type of the array
          // to eliminate undefined values so using $FlowIssue tag to ignore the
          // complaints about `legislator` type.
          const contributionData = await fetchContributionsForCandidate(
            ORGANIZATION,
            // $FlowIssue
            legislator
          );
          dispatch(
            // $FlowIssue
            receiveContributionDataForLegislator(legislator, contributionData)
          );
        });
    } catch (error) {
      if (error instanceof ResponseError) {
        // response is error; abort
        dispatch(receiveOfficialsError(error));
        return;
      }
    }
  };
}
