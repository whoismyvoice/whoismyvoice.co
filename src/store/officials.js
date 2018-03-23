// @flow

import {
  RECEIVE_OFFICIALS,
  RESET_CURRENT,
  RECEIVE_OFFICIALS_ALL,
} from '../actions/types';
import { Legislator } from '../models/Legislator';

import type { Action } from '../actions/types';
import type {
  LegislatorIdentifier,
  LegislatorRecord,
} from '../models/Legislator';

type OfficialsById = {
  [id: LegislatorIdentifier]: LegislatorRecord,
};

export type OfficialsState = {
  byId: OfficialsById,
  ids: Array<LegislatorIdentifier>,
};

const initialState = {
  byId: {},
  ids: [],
};

/**
 * Provide byId object for given action.
 *
 * `action.officials` should at least have the form:
 *
 *    {
 *      "name": {
 *        "official_full": <string>,
 *      }
 *    }
 *
 * @param {object} state the current object of ids as keys to official.
 * @param {object} action to be processed.
 * @param {string} action.type of action.
 * @param {array} action.officials received by the action.
 * @returns the `byId` object with ids as keys and official as values.
 */
function handleById(state: OfficialsById, action: Action): OfficialsById {
  const { type } = action;
  switch (type) {
    case RECEIVE_OFFICIALS:
      const googleCivicOfficials = action.officials;
      return googleCivicOfficials.reduce(
        (byId, official) => ({
          ...byId,
          [Legislator.getIdentifier(official)]: {
            ...(byId[official.name] || {}),
            channels: official.channels,
            identifier: Legislator.getIdentifier(official),
            photoUrl: official.photoUrl,
          },
        }),
        state
      );
    case RECEIVE_OFFICIALS_ALL:
      const { officials } = action;
      return officials.reduce(
        (byId, official) => ({
          ...byId,
          [Legislator.getIdentifier(official)]: {
            ...byId[official.name.official_full],
            ...official,
            identifier: Legislator.getIdentifier(official),
          },
        }),
        state
      );
    default:
      return state;
  }
}

/**
 * Provide ids array for given action.
 *
 * `action.officials` should at least have the form:
 *
 *    {
 *      "name": <string>,
 *    }
 *
 * @param {object} state the current set of ids.
 * @param {object} action to be processed.
 * @param {string} action.type of action.
 * @param {array} action.officials received by the action.
 * @returns the set of ids after processing `action`.
 */
function handleIds(
  state: Array<LegislatorIdentifier>,
  action: Action
): Array<LegislatorIdentifier> {
  const { type } = action;
  switch (type) {
    case RECEIVE_OFFICIALS:
      const { officials } = action;
      return officials.reduce((ids, official) => {
        if (ids.indexOf(official.name) >= 0) {
          return ids;
        } else {
          return [...ids, official.name];
        }
      }, []);
    case RESET_CURRENT:
      return [];
    default:
      return state;
  }
}

function handle(
  state: OfficialsState = initialState,
  action: Action
): OfficialsState {
  const { type } = action;
  switch (type) {
    case RECEIVE_OFFICIALS_ALL:
      return {
        ...state,
        byId: handleById(state.byId, action),
      };
    case RECEIVE_OFFICIALS:
      return {
        ...state,
        byId: handleById(state.byId, action),
        ids: handleIds(state.ids, action),
      };
    case RESET_CURRENT:
      return {
        ...state,
        ids: handleIds(state.ids, action),
      };
    default:
      return state;
  }
}

export default handle;
