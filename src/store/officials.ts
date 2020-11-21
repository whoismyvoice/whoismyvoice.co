import { Draft, produce } from 'immer';
import {
  Action,
  ActionType,
  LegislatorsAction,
  OfficesAction,
} from '../actions/types';
import {
  BioguideId,
  CongressPerson,
  Legislator,
  Record as LegislatorRecord,
  Senator,
} from '../models/Legislator';

type LegislatorsById = Readonly<Record<BioguideId, LegislatorRecord>>;

export interface OfficialsState {
  readonly byBioguideId: LegislatorsById;
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
 * Combine data from two `LegislatorRecord` instances into one.
 * @param left to use as the base `LegislatorRecord`.
 * @param right to be combined with `left`, values from `right` will overwrite
 * values from `left`.
 * @returns the combined `LegislatorRecord`.
 */
function mergeLegislator(
  left: LegislatorRecord,
  right: LegislatorRecord
): LegislatorRecord {
  return {
    ...left,
    ...right,
    identifier: Legislator.getIdentifier(right),
  };
}

/**
 * Modifies `LegislatorsById` state by adding the given `LegislatorRecord`.
 * @param state to be modified.
 * @param official to be added.
 * @returns a new copy of `LegislatorsById` state.
 */
const handleLegislator = produce(
  (draft: Draft<LegislatorsById>, official: LegislatorRecord) => {
    const id = Legislator.getBioguideId(official);
    const current = draft[id];
    draft[id] = mergeLegislator(current, official);
  }
);

/**
 * Provide byBioguideId object for given action.
 * @param state the current object of ids as keys to official.
 * @param action to be processed.
 * @returns the `byBioguideId` object with bioguide ids as keys and official as
 * values.
 */
function handleByBioguideId(
  state: LegislatorsById,
  action: LegislatorsAction
): LegislatorsById {
  return action.officials.reduce(handleLegislator, state);
}

function handleLegislators(
  state: OfficialsState,
  action: OfficesAction
): OfficialsState['legislators'] {
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
}

const handler = produce((draft: Draft<OfficialsState>, action: Action) => {
  switch (action.type) {
    case ActionType.RECEIVE_OFFICES:
      draft.legislators = handleLegislators(draft, action);
      break;
    case ActionType.RECEIVE_OFFICIALS_ALL:
      draft.byBioguideId = handleByBioguideId(draft.byBioguideId, action);
      break;
    case ActionType.RECEIVE_HOUSE:
      draft.house = action.congressPersons;
      break;
    case ActionType.RECEIVE_SENATE:
      draft.senate = action.senators;
      break;
    case ActionType.RESET_CURRENT:
      draft.legislators = [];
      break;
  }
}, INITIAL_OFFICIALS);

export default handler;
