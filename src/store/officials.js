import {
  RECEIVE_OFFICIALS,
  RESET_CURRENT,
  RECEIVE_OFFICIALS_ALL,
} from '../actions/types';

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
function handleById(state, action) {
  const { type, } = action;
  switch (type) {
    case RECEIVE_OFFICIALS:
      const googleCivicOfficials = action.officials;
      return googleCivicOfficials.reduce((byId, official) => ({
        ...byId,
        [official.name]: {
          ...(byId[official.name] || {}),
          channels: official.channels,
          photoUrl: official.photoUrl,
        },
      }), state);
    case RECEIVE_OFFICIALS_ALL:
      const { officials, } = action;
      return officials.reduce((byId, official) => ({
        ...byId,
        [official.name.official_full]: {
          ...(byId[official.name.official_full]),
          ...official,
        },
      }), state);
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
function handleIds(state, action) {
  const { type, } = action;
  switch (type) {
    case RECEIVE_OFFICIALS:
      const { officials, } = action;
      return officials.reduce((ids, official) => {
        if (ids.indexOf(official.name) >= 0) {
          return ids;
        } else {
          return [ ...ids, official.name, ];
        }
      }, []);
    case RESET_CURRENT:
      return [];
    default:
      return state;
  }
}

function handle(state = initialState, action) {
  const { type, } = action;
  switch (type) {
    case RECEIVE_OFFICIALS_ALL:
      return {
        ...state,
        byId: handleById(state.byId, action),
      };
    case RECEIVE_OFFICIALS: // intentional fall-through
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
