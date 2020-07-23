import { Action, ActionType } from '../actions/types';
import { Contribution } from '../models/Contribution';
import icebox from './icebox';

interface ContributionsByOrganization {
  [name: string]: Array<Contribution>;
}

export interface ContributionsState {
  byOrganization: ContributionsByOrganization;
  sectors: string[];
}

export const INITIAL_CONTRIBUTIONS: ContributionsState = {
  byOrganization: {},
  sectors: [],
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
): Array<Contribution> {
  const recipientIndex = contributions.findIndex((contrib) =>
    isContributionMatch(contrib, contribution)
  );
  if (recipientIndex === -1) {
    return [...contributions, contribution];
  } else {
    return [
      ...contributions.slice(0, recipientIndex),
      ...contributions.slice(recipientIndex + 1),
      contribution,
    ];
  }
}

/**
 * Modifies `ContributionsByOrganization` state by adding the given
 * `Contribution`.
 * @param state to be modified.
 * @param contribution to be added.
 * @returns a new copy of `ContributionsByOrganization` state.
 */
function handleContribution(
  state: ContributionsByOrganization,
  contribution: Contribution
): ContributionsByOrganization {
  const organization = contribution.organization;
  const contributions = state[organization] || [];
  return {
    ...state,
    [organization]: addContribution(contributions, contribution),
  };
}

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
      // eslint-disable-next-line no-case-declarations
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
 * Modify the current state by adding the contribution represented by `action`
 * into the appropriate organization.
 * @param state
 * @param action to be processed.
 * @returns an updated `contributions` state.
 */
function handle(
  state: ContributionsState = INITIAL_CONTRIBUTIONS,
  action: Action
): ContributionsState {
  return {
    byOrganization: handleByOrganization(state.byOrganization, action),
    sectors: handleSectors(state.sectors, action),
  };
}

export default icebox(handle);
