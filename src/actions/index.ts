import unfetch from 'isomorphic-unfetch';

import { ELECTION_CYCLE } from '../constants';
import { Action, ActionType, Dispatch } from './types';
import {
  SectorContribution,
  SectorContributions,
} from '../models/Contribution';
import {
  BioguideId,
  CongressPerson,
  Legislator,
  Record as LegislatorRecord,
  Senator,
} from '../models/Legislator';
import { Office, Record as OfficeRecord } from '../models/Office';
import { GoogleResponseError } from '../models/GoogleResponseError';
import { ResponseError } from '../models/ResponseError';
import store from '../store';
import { isDefined } from '../util';

/**
 * Describes a function which extracts arbitrary data from a given XML document.
 */
type Extractor<T> = (document: Document) => T;

const fetch = unfetch;

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
  const legislatorId = Legislator.getBioguideId(legislator);
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
 * Get the congressional district and bioguide id of members of the House of
 * Representatives from the given XML document.
 * @param document containing information about members of congress.
 * @returns a list of objects correlating districts with bioguide identifiers.
 */
function extractCongressPersons(document: Document): CongressPerson[] {
  const nodes = document.getElementsByTagName('member');
  const elements = Array.from(nodes);
  return elements
    .map((node) => {
      const districtId = node.querySelector('statedistrict')?.textContent;
      const bioguideId = node.querySelector('bioguideID')?.textContent;
      if (districtId && bioguideId) {
        return {
          districtId,
          bioguideId,
        };
      } else {
        return undefined;
      }
    })
    .filter(isDefined);
}

/**
 * Get the state and bioguide id of members of the Senate from the given XML
 * document.
 * @param document containing information about members of congress.
 * @returns a list of objects correlating states with bioguide identifiers.
 */
function extractSenators(document: Document): Senator[] {
  const nodes = document.getElementsByTagName('member');
  const elements = Array.from(nodes);
  return elements
    .map((node) => {
      const state = node.querySelector('state')?.textContent;
      const bioguideId = node.querySelector('bioguide_id')?.textContent;
      if (state && bioguideId) {
        return {
          state,
          bioguideId,
        };
      } else {
        return undefined;
      }
    })
    .filter(isDefined);
}

/**
 * Retrieve XML data from the given `url` and parse the resulting `Document`
 * into the desired data on success.
 * @param url from which the XML will be requested.
 * @param extractor used to get data from the XML document.
 * @returns the results of extracting Document data with `extractor`.
 * @throws `ResponseError` if the request to `url` does not return an OK
 * response.
 */
async function fetchXml<T>(url: string, extractor: Extractor<T>): Promise<T> {
  const response = await fetch(url, { mode: 'cors' });
  if (response.ok) {
    const body = await response.text();
    // Parse XML document
    const parser = new DOMParser();
    const doc = parser.parseFromString(body, 'text/xml');
    return extractor(doc);
  } else {
    throw new ResponseError(response, response.statusText);
  }
}

/**
 * Retrieve contributions group by business sector.
 * @param {LegislatorRecord} legislator for whom data will be retrieved.
 * @returns contribution data.
 */
async function fetchContributionsBySector(
  legislator: LegislatorRecord
): Promise<SectorContributions> {
  const electionCycle = await ELECTION_CYCLE;
  if (process.env.REACT_APP_OPEN_SECRETS_API_KEY === undefined) {
    throw new Error('REACT_APP_OPEN_SECRETS_API_KEY must be set');
  }
  const apiKey = encodeURIComponent(
    `${process.env.REACT_APP_OPEN_SECRETS_API_KEY}`
  );
  const candidateId = encodeURIComponent(legislator.id.opensecrets);
  const apiMethod = encodeURIComponent('candSector');
  const encodedCycle = encodeURIComponent(electionCycle.split('|')[0]);
  const params = `method=${apiMethod}&apikey=${apiKey}&cid=${candidateId}&cycle=${encodedCycle}`;
  return fetchXml(`https://www.opensecrets.org/api/?${params}`, (doc) =>
    createSectorContributions(legislator, doc)
  );
}

/**
 * Retrieve data about offices based the provided address.
 * @param address to use in lookup.
 * @returns array of Offices.
 */
async function fetchOfficesForAddress(address: string): Promise<Office[]> {
  const baseUrl = `/api/civic-information`;
  const encodedAddress = encodeURIComponent(address);
  const params = `address=${encodedAddress}`;
  const response = await fetch(`${baseUrl}?${params}`);
  if (response.ok) {
    const body: { offices: OfficeRecord[] } = await response.json();
    return body.offices.map((office: OfficeRecord) => new Office(office));
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
  legislatorId: BioguideId,
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
 * Create action to notify of bulk contribution sector data received.
 * @param contributions received.
 * @returns action.
 */
export function receiveContributionsBySector(
  contributions: SectorContributions[]
): Action {
  return {
    type: ActionType.RECEIVE_CONTRIBUTIONS_BY_SECTOR_DATA,
    contributions: contributions,
  };
}

/**
 * Create action to notify members of the house of representatives have been
 * received.
 * @param congressPersons received.
 * @returns action.
 */
export function receiveHouse(congressPersons: CongressPerson[]): Action {
  return {
    type: ActionType.RECEIVE_HOUSE,
    congressPersons,
  };
}

/**
 * Create action to notify offices have been successfully retrieved for an
 * address.
 * @param offices received.
 * @returns action.
 */
export function receiveOffices(offices: Office[]): Action {
  return {
    type: ActionType.RECEIVE_OFFICES,
    offices,
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
  return {
    type: ActionType.RECEIVE_OFFICIALS_ALL,
    officials,
  };
}

/**
 * Create action to notify retrieving offices encountered an error.
 * @param {error} error received.
 * @returns action.
 */
export async function receiveOfficesError(
  error: GoogleResponseError
): Promise<Action> {
  return {
    type: ActionType.RECEIVE_OFFICES_ERROR,
    code: await error.code,
    isGlobal: await error.isGlobal,
    isParseError: await error.isParseError,
    message: await error.responseMessage,
    messages: await error.errorMessages,
  };
}

/**
 * Create action to notify members of the senate have been received.
 * @param senators received.
 * @returns action.
 */
export function receiveSenate(senators: Senator[]): Action {
  return {
    type: ActionType.RECEIVE_SENATE,
    senators,
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
  return {
    type: ActionType.RESET_CURRENT,
  };
}

/**
 * Create a TOGGLE_MENU action instance.
 * @returns action.
 */
export function toggleMenu(): Action {
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
      const [
        allLegislators,
        congressPersons,
        senators,
        offices,
      ] = await Promise.all([
        fetchLegislatorsAll(),
        fetchXml('/api/congress/house', extractCongressPersons),
        fetchXml('/api/congress/senate', extractSenators),
        fetchOfficesForAddress(address),
      ]);
      dispatch(receiveHouse(congressPersons));
      dispatch(receiveSenate(senators));
      dispatch(receiveOfficialsAll(allLegislators));
      dispatch(receiveOffices(offices));
      const legislators = store.getState().officials.legislators;
      void Promise.all(
        legislators.map((record) => fetchContributionsBySector(record))
      )
        .then(receiveContributionsBySector)
        .then(dispatch);
    } catch (error) {
      if (error instanceof GoogleResponseError) {
        // response is error; abort
        void receiveOfficesError(error).then(dispatch);
      }
    }
  };
}
