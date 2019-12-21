import unfetch from 'isomorphic-unfetch';
import * as mixpanel from 'mixpanel-browser';

import { ELECTION_CYCLE, EXECUTE_PROXY, ORGANIZATION } from '../constants';
import { Action, ActionType, Dispatch } from './types';
import { Contribution } from '../models/Contribution';
import {
  Legislator,
  Identifier as LegislatorIdentifier,
  Record as LegislatorRecord,
} from '../models/Legislator';
import { MaplightResultsRecord } from '../models/MaplightResults';
import { Record as Official } from '../models/Official';
import { GoogleResponseError } from '../models/GoogleResponseError';
import { ResponseError } from '../models/ResponseError';

const fetch = unfetch;

/**
 * Match FEC ids for house and senate races. Potentially important because some
 * of these candidates may run for other offices (e.g. President) and we are not
 * interested in those contributions.
 */
const FEC_ID_REGEX = /[HS]\d{1,3}[A-Z]{2}\d+/;

/**
 * Finesse the `MaplightResultsRecord` and `LegislatorRecord` data into a
 * `Contribution`.
 * @param {LegislatorRecord} legislator from which identifier will be retrieved.
 * @param {MaplightResultsRecord} contributionData from which amount and
 *    organization will be retrieved.
 * @returns the data as a `Contribution`.
 */
function createContribution(
  legislator: LegislatorRecord,
  contributionData: MaplightResultsRecord
) {
  return {
    legislatorId: Legislator.getIdentifier(legislator),
    organization: contributionData.search_terms.donor.donor_organization,
    amount: contributionData.data.aggregate_totals[0].total_amount,
  };
}

/**
 * Retrieve aggregated contribution data for given `organization` and `legislator`.
 * @param {string} organization name whose contributions will be searched.
 * @param {LegislatorRecord} legislator for whom data will be retrieved.
 * @returns contribution data.
 */
function fetchContributions(organization: string) {
  return async (legislator: LegislatorRecord) => {
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
      return body as MaplightResultsRecord;
    } else {
      throw new ResponseError(response, response.statusText);
    }
  };
}

/**
 * Retrieve data about officials/representatives based the provided address.
 * @param {string} address to use in lookup.
 * @returns array of officials.
 */
async function fetchOfficialsForAddress(address: string) {
  const baseUrl = `${EXECUTE_PROXY}/civics`;
  const encodedAddress = encodeURIComponent(address);
  const params = `address=${encodedAddress}`;
  const response = await fetch(`${baseUrl}?${params}`);
  if (response.ok) {
    const body = await response.json();
    const officials = body.officials;
    return officials as Array<Official>;
  } else {
    throw new GoogleResponseError(response, response.statusText);
  }
}

/**
 * Retreive data about officials/legislators for the current legislative session.
 * @returns array of officials.
 */
async function fetchLegislatorsAll() {
  const url =
    'https://theunitedstates.io/congress-legislators/legislators-current.json';
  const response = await fetch(url);
  if (response.ok) {
    return (await response.json()) as Array<LegislatorRecord>;
  } else {
    throw new ResponseError(response, response.statusText);
  }
}

/**
 * Create a function that searches `allLegislators` for `official`.
 * @param {Array<LegislatorRecord>} allLegislators records to be searched.
 * @returns function that tries to match given `official` to a
 *    `LegislatorRecord`.
 */
function getLegislatorForOfficial(allLegislators: Array<LegislatorRecord>) {
  return (official: Official) =>
    allLegislators.find(
      legislator => Legislator.getIdentifier(legislator) === Legislator.getIdentifier(official)
    );
}

/**
 * Create action to navigate to the specified group of legislators.
 * @param {number} page indicate group of legislators to view.
 * @returns action.
 */
export function navigateLegislators(page: 1 | 2): Action {
  return {
    type: ActionType.RECEIVE_PAGE,
    page,
  };
}

/**
 * Create action to notify address has been set.
 * @param {array} address received.
 * @returns action.
 */
export function receiveAddress(address: string): Action {
  mixpanel.track(ActionType.RECEIVE_ADDRESS);
  return {
    type: ActionType.RECEIVE_ADDRESS,
    address,
  };
}

/**
 * Create action to notify of contribution data received.
 * @param {string} legislatorId official full name of the legislator
 *    according to FEC records.
 * @param {string} organization making the contribution.
 * @param {number} amount received in contributions.
 * @returns action.
 */
export function receiveContribution(
  legislatorId: LegislatorIdentifier,
  organization: string,
  amount: number
): Action {
  return {
    type: ActionType.RECEIVE_CONTRIBUTION_DATA,
    amount,
    legislatorId,
    organization,
  };
}

/**
 * Create action to notify of bulk contribution data received.
 * @param {Array<Contribution>} contributions received.
 * @returns action.
 */
export function receiveContributions(
  contributions: Array<Contribution>
): Action {
  mixpanel.track(ActionType.RECEIVE_CONTRIBUTION_DATA, {
    count: contributions.length,
  });
  return {
    type: ActionType.RECEIVE_CONTRIBUTIONS_DATA,
    contributions: contributions,
  };
}

/**
 * Create action to notify officials retrieved.
 * @param {array} officials received.
 * @returns action.
 */
export function receiveOfficials(officials: Array<Official>): Action {
  mixpanel.track(ActionType.RECEIVE_OFFICIALS, { count: officials.length });
  return {
    type: ActionType.RECEIVE_OFFICIALS,
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
  mixpanel.track(ActionType.RECEIVE_OFFICIALS_ALL);
  return {
    type: ActionType.RECEIVE_OFFICIALS_ALL,
    officials,
  };
}

/**
 * Create action to notify officials retrieved an error.
 * @param {error} error received.
 * @returns action.
 */
export async function receiveOfficialsError(
  error: GoogleResponseError
): Promise<Action> {
  mixpanel.track(ActionType.RECEIVE_OFFICIALS_ERROR, {
    message: error.message,
  });
  return {
    type: ActionType.RECEIVE_OFFICIALS_ERROR,
    code: await error.code,
    isGlobal: await error.isGlobal,
    isParseError: await error.isParseError,
    message: await error.responseMessage,
    messages: await error.errorMessages,
  };
}

/**
 * Create action to notify address has been set.
 * @param {array} address received.
 * @returns action.
 */
export function receiveZipCode(zipCode: string): Action {
  return {
    type: ActionType.RECEIVE_ZIP_CODE,
    zipCode,
  };
}

/**
 * Create action to reset current state.
 * @returns action.
 */
export function reset(): Action {
  mixpanel.track(ActionType.RESET_CURRENT);
  return {
    type: ActionType.RESET_CURRENT,
  };
}

/**
 * Create a TOGGLE_MENU action instance.
 * @returns action.
 */
export function toggleMenu(): Action {
  mixpanel.track(ActionType.TOGGLE_MENU);
  return {
    type: ActionType.TOGGLE_MENU,
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
      const officials = await fetchOfficialsForAddress(address);
      dispatch(receiveOfficialsAll(allLegislators));
      dispatch(receiveOfficials(officials));
      const getLegislator = getLegislatorForOfficial(allLegislators);
      const getContributions = fetchContributions(ORGANIZATION);
      const contributions = await Promise.all(
        officials
          .map(getLegislator)
          .filter(legislator => legislator !== undefined)
          .map(async record => {
            const legislator = record!; // safe because of filter function above
            const contributionData = await getContributions(legislator);
            return createContribution(legislator, contributionData);
          })
      );
      dispatch(receiveContributions(contributions));
    } catch (error) {
      if (error instanceof GoogleResponseError) {
        // response is error; abort
        receiveOfficialsError(error).then(dispatch);
        return;
      }
    }
  };
}
