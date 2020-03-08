import { Action, ActionType } from '../actions/types';
import {
  Legislator,
  Identifier as LegislatorIdentifier,
  Record as LegislatorRecord,
} from '../models/Legislator';
import { Record as Official } from '../models/Official';
import icebox from './icebox';

type LegislatorsById = {
  [id: string]: LegislatorRecord;
};

export type OfficialsState = {
  byId: LegislatorsById;
  ids: Array<LegislatorIdentifier>;
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
function handleById(state: LegislatorsById, action: Action): LegislatorsById {
  switch (action.type) {
    case ActionType.RECEIVE_OFFICIALS:
      return action.officials.reduce(
        (byId: LegislatorsById, official: Official) => ({
          ...byId,
          [Legislator.getIdentifier(official)]: {
            ...(byId[Legislator.getIdentifier(official)] || {}),
            channels: official.channels,
            identifier: Legislator.getIdentifier(official),
            photoUrl: official.photoUrl,
          },
        }),
        state
      );
    case ActionType.RECEIVE_OFFICIALS_ALL:
      return action.officials.reduce(
        (byId: LegislatorsById, official: LegislatorRecord) => ({
          ...byId,
          [Legislator.getIdentifier(official)]: {
            ...byId[Legislator.getIdentifier(official)],
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
  switch (action.type) {
    case ActionType.RECEIVE_OFFICIALS:
      return action.officials.reduce(
        (ids: Array<string>, official: Official) => {
          const identifier = Legislator.getIdentifier(official);
          if (ids.indexOf(identifier) >= 0) {
            return ids;
          } else {
            return [...ids, identifier];
          }
        },
        []
      );
    case ActionType.RESET_CURRENT:
      return [];
    default:
      return state;
  }
}

function handle(
  state: OfficialsState = initialState,
  action: Action
): OfficialsState {
  switch (action.type) {
    case ActionType.RECEIVE_OFFICIALS_ALL:
      return {
        ...state,
        byId: handleById(state.byId, action),
      };
    case ActionType.RECEIVE_OFFICIALS:
      return {
        ...state,
        byId: handleById(state.byId, action),
        ids: handleIds(state.ids, action),
      };
    case ActionType.RESET_CURRENT:
      return {
        ...state,
        ids: handleIds(state.ids, action),
      };
    default:
      return state;
  }
}

export default icebox(handle);
