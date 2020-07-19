import unfetch from 'isomorphic-unfetch';
import * as mixpanel from 'mixpanel-browser';

import { ELECTION_CYCLE, ORGANIZATION } from '../constants';
import { Action, ActionType, Dispatch } from './types';
import {
  Contribution,
  SectorContribution,
  SectorContributions,
} from '../models/Contribution';
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
 * Type guard to check if the given item exists (is not `null` and not
 * `undefined`.
 * @param item to test.
 * @return `true` iff `item` is neither `null` nor `undefined`.
 */
function isDefined<T>(item: T | undefined | null): item is T {
  return item !== undefined && item !== null;
}

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
): Contribution {
  return {
    legislatorId: Legislator.getIdentifier(legislator),
    organization: contributionData.search_terms.donor.donor_organization,
    amount: contributionData.data.aggregate_totals[0].total_amount,
  };
}

/**
 * Create a `SectorContribution` from the given `node` by reading its properties.
 * @param node from which sector contribution data will be parsed.
 * @returns a record with the sector contribution information if it could be
 * parsed, `undefined` if it could not be parsed from the attributes of `node`.
 */
function createSectorContribution(
  node: Element
): SectorContribution | undefined {
  const sector = node.getAttribute('sector_name');
  const sectorCode = node.getAttribute('sectorid');
  const total = node.getAttribute('total');
  if (sector === null || sectorCode === null || total === null) {
    return undefined;
  }
  const amount = parseInt(total, 10);
  if (isNaN(amount)) {
    return undefined;
  } else {
    return {
      amount,
      sector,
      sectorCode,
    };
  }
}

/**
 * Finesse the `Document` from the Open Secrets API into a list of
 * contributions.
 * @param legislator from which identifier will be retrieved.
 * @param document from which sector contribution data will be parsed.
 * @returns a record with the legislator id and a list of sector contribution
 * data.
 */
function createSectorContributions(
  legislator: LegislatorRecord,
  document: Document
): SectorContributions {
  const nodes = document.getElementsByTagName('sector');
  const legislatorId = Legislator.getIdentifier(legislator);
  const elements = Array.from(nodes);
  const contributions = elements
    .map(createSectorContribution)
    .filter(isDefined);
  return {
    legislatorId,
    contributions,
  };
}

/**
 * Get contributions to the given `legislator` from the `organization`.
 * @param organization whose contributions to `legislator` should be retrieved.
 * @param legislator for whome `organization` contributions will be retrieved.
 * @returns a `Contribution` record for `legislator` from `organization`.
 */
async function fetchContributionByOrg(
  organization: string,
  legislator: LegislatorRecord
): Promise<Contribution> {
  const getContributions = fetchContributions(organization);
  const contributionData = await getContributions(legislator);
  return createContribution(legislator, contributionData);
}

/**
 * Retrieve aggregated contribution data for given `organization` and `legislator`.
 * @param {string} organization name whose contributions will be searched.
 * @param {LegislatorRecord} legislator for whom data will be retrieved.
 * @returns contribution data.
 */
function fetchContributions(organization: string) {
  return async (
    legislator: LegislatorRecord
  ): Promise<MaplightResultsRecord> => {
    const candidateFecIds = legislator.id.fec.filter((fecId) =>
      FEC_ID_REGEX.test(fecId)
    );
    const baseUrl = '/api/contributions';
    const electionCycle = encodeURIComponent(await ELECTION_CYCLE);
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
 * Retrieve contributions group by business sector.
 * @param {LegislatorRecord} legislator for whom data will be retrieved.
 * @returns contribution data.
 */
async function fetchContributionsBySector(
  legislator: LegislatorRecord
): Promise<SectorContributions> {
  const opensecretsId = legislator.id.opensecrets;
  const baseUrl = '/api/contributions/by-sector';
  const electionCycle = await ELECTION_CYCLE;
  const encodedCycle = encodeURIComponent(electionCycle.split('|')[0]);
  const encodedId = encodeURIComponent(opensecretsId);
  const params = `cycle=${encodedCycle}&id=${encodedId}`;
  const url = `${baseUrl}?${params}`;
  const response = await fetch(url, {
    mode: 'cors',
    headers: {
      'Content-Type': 'text/xml',
    },
  });
  if (response.ok) {
    const body = await response.text();
    // Parse XML document
    const parser = new DOMParser();
    const doc = parser.parseFromString(body, 'text/xml');
    return createSectorContributions(legislator, doc);
  } else {
    throw new ResponseError(response, response.statusText);
  }
}

/**
 * Retrieve data about officials/representatives based the provided address.
 * @param {string} address to use in lookup.
 * @returns array of officials.
 */
async function fetchOfficialsForAddress(address: string): Promise<Official[]> {
  const baseUrl = `/api/civic-information`;
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
async function fetchLegislatorsAll(): Promise<LegislatorRecord[]> {
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
  return (official: Official): LegislatorRecord | undefined =>
    allLegislators.find(
      (legislator) =>
        Legislator.getIdentifier(legislator) ===
        Legislator.getIdentifier(official)
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
 * Create action to notify of bulk contribution sector data received.
 * @param contributions received.
 * @returns action.
 */
export function receiveContributionsBySector(
  contributions: SectorContributions[]
): Action {
  mixpanel.track(ActionType.RECEIVE_CONTRIBUTION_DATA, {
    count: contributions.length,
  });
  return {
    type: ActionType.RECEIVE_CONTRIBUTIONS_BY_SECTOR_DATA,
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
 * Create an invalid zip code action.
 * @returns an action indicating zip code is not valid.
 */
export function receiveZipCodeInvalid(): Action {
  return {
    type: ActionType.RECEIVE_ZIP_CODE_INVALID,
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
  return (dispatch: Dispatch): void => {
    dispatch(receiveZipCode(zipCode));
    setAddress(zipCode)(dispatch);
  };
}

/**
 * Asynchronously dispatch updates to address.
 */
export function setAddress(address: string) {
  return async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch(receiveAddress(address));
      const [allLegislators, officials] = await Promise.all([
        fetchLegislatorsAll(),
        fetchOfficialsForAddress(address),
      ]);
      dispatch(receiveOfficialsAll(allLegislators));
      dispatch(receiveOfficials(officials));
      const fetchContribution = fetchContributionByOrg.bind(null, ORGANIZATION);
      const getLegislator = getLegislatorForOfficial(allLegislators);
      const legislators = officials.map(getLegislator).filter(isDefined);
      Promise.all(
        legislators.map((record) => fetchContributionsBySector(record))
      )
        .then(receiveContributionsBySector)
        .then(dispatch);
      Promise.all(legislators.map(fetchContribution))
        .then(receiveContributions)
        .then(dispatch);
    } catch (error) {
      if (error instanceof GoogleResponseError) {
        // response is error; abort
        receiveOfficialsError(error).then(dispatch);
        return;
      }
    }
  };
}
