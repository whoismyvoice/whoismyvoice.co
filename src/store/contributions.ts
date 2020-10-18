import { castDraft, Draft, produce } from 'immer';
import { Action, ActionType } from '../actions/types';
import { Contribution, SectorContributions } from '../models/Contribution';
import { BioguideId } from '../models/Legislator';

type ContributionsByOrganization = Record<string, Contribution[]>;
type ContributionsByLegislator = Record<BioguideId, SectorContributions>;

export interface ContributionsState {
  readonly byOrganization: ContributionsByOrganization;
  readonly sectors: string[];
  readonly sectorsByLegislator: ContributionsByLegislator;
}

export const INITIAL_CONTRIBUTIONS: ContributionsState = {
  byOrganization: {},
  sectors: [],
  sectorsByLegislator: {},
};

/**
 * Check whether two contributions match in legislator and organization.
 * @param c1 a contribution for comparison.
 * @param c2 a contribution for comparison.
 * @returns `true` if legislator and organization match, `false` otherwise.
 */
function isContributionMatch(c1: Contribution, c2: Contribution): boolean {
  return (
    c1.legislatorId === c2.legislatorId && c1.organization === c2.organization
  );
}

/**
 * Add a `contribution` to the list of `contributions` ensuring only one
 * contribution for each legislator.
 * @param contributions list to which `contribution` will be added.
 * @param contribution to be added.
 * @returns a copy of `contributions` containing `contribution`.
 */
function addContribution(
  contributions: Array<Contribution>,
  contribution: Contribution
): Contribution[] {
  return produce(contributions, (draft) => {
    const recipientIndex = contributions.findIndex((contrib) =>
      isContributionMatch(contrib, contribution)
    );
    if (recipientIndex === -1) {
      draft.push(contribution);
    } else {
      draft.splice(recipientIndex, 1, contribution);
    }
  });
}

/**
 * Modifies `ContributionsByOrganization` state by adding the given
 * `Contribution`.
 * @param state to be modified.
 * @param contribution to be added.
 * @returns a new copy of `ContributionsByOrganization` state.
 */
const handleContribution = produce(
  (draft: Draft<ContributionsByOrganization>, contribution: Contribution) => {
    const organization = contribution.organization;
    const contributions = draft[organization] || [];
    draft[organization] = addContribution(contributions, contribution);
  }
);

/**
 * Modify the current state by adding the contribution represented by `action`
 * into the appropriate organization.
 * @param state with lists of contributions for each organization key.
 * @param action to be processed.
 * @returns an updated `ContributionsByOrganization` state.
 */
function handleByOrganization(
  state: ContributionsByOrganization,
  action: Action
): ContributionsByOrganization {
  switch (action.type) {
    case ActionType.RECEIVE_CONTRIBUTION_DATA:
      // eslint-disable-next-line no-case-declarations, @typescript-eslint/no-unused-vars
      const { type, ...payload } = action;
      return handleContribution(state, payload);
    case ActionType.RECEIVE_CONTRIBUTIONS_DATA:
      return action.contributions.reduce(handleContribution, state);
    default:
      return state;
  }
}

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
  draft.byOrganization = castDraft(
    handleByOrganization(draft.byOrganization, action)
  );
  draft.sectors = handleSectors(draft.sectors, action);
  draft.sectorsByLegislator = handleSectorsByLegislator(
    draft.sectorsByLegislator,
    action
  );
}, INITIAL_CONTRIBUTIONS);

export default handler;
