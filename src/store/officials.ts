import { Action, ActionType } from '../actions/types';
import {
  BioguideId,
  CongressPerson,
  Legislator,
  Record as LegislatorRecord,
  Senator,
} from '../models/Legislator';
import icebox from './icebox';

type LegislatorsById = Readonly<Record<string, LegislatorRecord>>;

export interface OfficialsState {
  readonly byBioguideId: Record<BioguideId, LegislatorRecord>;
  readonly house: CongressPerson[];
  readonly legislators: LegislatorRecord[];
  readonly senate: Senator[];
}

export const INITIAL_OFFICIALS: OfficialsState = {
  byBioguideId: {},
  house: [],
  legislators: [],
  senate: [],
};

/**
 * Provide byBioguideId object for given action.
 * @param state the current object of ids as keys to official.
 * @param action to be processed.
 * @returns the `byBioguideId` object with bioguide ids as keys and official as
 * values.
 */
function handleByBioguideId(
  state: OfficialsState['byBioguideId'],
  action: Action
): OfficialsState['byBioguideId'] {
  switch (action.type) {
    case ActionType.RECEIVE_OFFICIALS_ALL:
      return action.officials.reduce(
        (byBioguideId: LegislatorsById, official: LegislatorRecord) => ({
          ...byBioguideId,
          [Legislator.getBioguideId(official)]: {
            ...byBioguideId[Legislator.getBioguideId(official)],
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

function handleLegislators(
  state: OfficialsState,
  action: Action
): OfficialsState['legislators'] {
  switch (action.type) {
    case ActionType.RESET_CURRENT:
      return [];
    case ActionType.RECEIVE_OFFICES:
      return action.offices
        .map((office) => {
          if (office.congressionalDistrict) {
            return state.house
              .filter((person) => person.districtId === office.id)
              .map((person) => state.byBioguideId[person.bioguideId]);
          } else if (office.state) {
            return state.senate
              .filter((senator) => senator.state === office.state)
              .map((senator) => state.byBioguideId[senator.bioguideId]);
          } else {
            return [];
          }
        })
        .flat();
    default:
      return state.legislators;
  }
}

function handle(
  state: OfficialsState = INITIAL_OFFICIALS,
  action: Action
): OfficialsState {
  switch (action.type) {
    case ActionType.RECEIVE_OFFICES:
      return {
        ...state,
        legislators: handleLegislators(state, action),
      };
    case ActionType.RECEIVE_OFFICIALS_ALL:
      return {
        ...state,
        byBioguideId: handleByBioguideId(state.byBioguideId, action),
      };
    case ActionType.RECEIVE_HOUSE:
      return {
        ...state,
        house: action.congressPersons,
      };
    case ActionType.RECEIVE_SENATE:
      return {
        ...state,
        senate: action.senators,
      };
    case ActionType.RESET_CURRENT:
      return {
        ...state,
        legislators: handleLegislators(state, action),
      };
    default:
      return state;
  }
}

export default icebox(handle);
