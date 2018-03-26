import { Action, ActionType } from '../actions/types';
import { Contribution } from '../models/Contribution';

interface ContributionsByOrganization {
  [name: string]: Array<Contribution>;
}

export interface ContributionsState {
  byOrganization: ContributionsByOrganization;
}

const initialState = {
  byOrganization: {},
};

/**
 * Check whether two contributions match in legislator and organization.
 * @param {Contribution} c1 a contribution for comparison.
 * @param {Contribution} c2 a contribution for comparison.
 * @returns `true` if legislator and organization match, `false` otherwise.
 */
function isContributionMatch(c1: Contribution, c2: Contribution) {
  return (
    c1.legislatorId === c2.legislatorId && c1.organization === c2.organization
  );
}

/**
 * Add a `contribution` to the list of `contributions` ensuring only one
 * contribution for each legislator.
 * @param {Contribution[]} contributions list to which `contribution` will
 *    be added.
 * @param {Contribution} contribution to be added.
 * @returns a copy of `contributions` containing `contribution`.
 */
function addContribution(
  contributions: Array<Contribution>,
  contribution: Contribution
): Array<Contribution> {
  const recipientIndex = contributions.findIndex(contrib =>
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
 * Modify the current state by adding the contribution represented by `action`
 * into the appropriate organization.
 * @param {object} state with lists of contributions for each organization key.
 * @param {object} action to be processed.
 * @param {string} action.type of action.
 * @param {number} action.amount of the contribution received.
 * @param {string} action.legislatorId that received the contribution.
 * @param {string} action.organization to be modified.
 * @returns an updated `contributions.byOrganization` state.
 */
function handleByOrganization(
  state: ContributionsByOrganization,
  action: Action
): ContributionsByOrganization {
  switch (action.type) {
    case ActionType.RECEIVE_CONTRIBUTION_DATA:
      const { organization } = action;
      const { type, ...payload } = action;
      return {
        ...state,
        [organization]: addContribution(state[organization] || [], payload),
      };
    default:
      return state;
  }
}

/**
 * Modify the current state by adding the contribution represented by `action`
 * into the appropriate organization.
 * @param {object} state
 * @param {object} state.byOrganization with lists of contributions for each organization key.
 * @param {object} action to be processed.
 * @returns an updated `contributions` state.
 */
function handle(state: ContributionsState = initialState, action: Action) {
  const { type } = action;
  switch (type) {
    case ActionType.RECEIVE_CONTRIBUTION_DATA:
      return {
        ...state,
        byOrganization: handleByOrganization(state.byOrganization, action),
      };
    default:
      return state;
  }
}

export default handle;
