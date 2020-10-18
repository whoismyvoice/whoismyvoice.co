import { castDraft, Draft, produce } from 'immer';
import { Action, ActionType } from '../actions/types';
import { SectorContributions } from '../models/Contribution';
import { BioguideId } from '../models/Legislator';

type ContributionsByLegislator = Record<BioguideId, SectorContributions>;

export interface ContributionsState {
  readonly sectors: string[];
  readonly sectorsByLegislator: ContributionsByLegislator;
}

export const INITIAL_CONTRIBUTIONS: ContributionsState = {
  sectors: [],
  sectorsByLegislator: {},
};

/**
 * Determine the list of sectors with contributions for a given `action`.
 * @param state the current list of sectors.
 * @param action to be processed.
 * @returns the list of sectors as changed by `action`.
 */
function handleSectors(state: string[], action: Action): string[] {
  switch (action.type) {
    case ActionType.RESET_CURRENT:
      return [];
    case ActionType.RECEIVE_CONTRIBUTIONS_BY_SECTOR_DATA:
      return Array.from(
        action.contributions
          .flatMap((group) => group.contributions)
          .map((contribution) => contribution.sector)
          .reduce((sectors, sector) => sectors.add(sector), new Set<string>())
      );
    default:
      return state;
  }
}

/**
 * Update the lookups object of `ContributionsByLegislator` based on data in the given `action`.
 * @param state representing the current view of the `ContributionsByLegislator`
 * @param aciton to be processed
 * @returns an update `ContributionsByLegislator` lookup "table"
 */
const handleSectorsByLegislator = produce(
  (draft: Draft<ContributionsByLegislator>, action: Action) => {
    if (action.type !== ActionType.RECEIVE_CONTRIBUTIONS_BY_SECTOR_DATA) {
      return;
    }
    for (const group of action.contributions) {
      draft[group.legislatorId] = castDraft(group);
    }
  }
);

/**
 * Modify the current state by adding the contribution represented by `action`
 * into the appropriate organization.
 * @param state
 * @param action to be processed.
 * @returns an updated `contributions` state.
 */
const handler = produce((draft: Draft<ContributionsState>, action: Action) => {
  draft.sectors = handleSectors(draft.sectors, action);
  draft.sectorsByLegislator = handleSectorsByLegislator(
    draft.sectorsByLegislator,
    action
  );
}, INITIAL_CONTRIBUTIONS);

export default handler;
