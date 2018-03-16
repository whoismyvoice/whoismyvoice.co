import PropTypes from 'prop-types';
import { RECEIVE_CONTRIBUTION_DATA } from '../actions/types';
import { PropType as ContributionType } from '../models/Contribution';

const initialState = {
  byOrganization: {},
};

/**
 * Check whether two contributions match in legislator and organization.
 * @param {ContributionType} c1 a contribution for comparison.
 * @param {ContributionType} c2 a contribution for comparison.
 * @returns `true` if legislator and organization match, `false` otherwise.
 */
function isContributionMatch(c1, c2) {
  PropTypes.checkPropTypes(
    { contributions: PropTypes.arrayOf(ContributionType) },
    { contributions: [c1, c2] },
    'c1, c2',
    'store/contributions#isContributionMatch'
  );
  return (
    c1.legislatorId === c2.legislatorId && c1.organization === c2.organization
  );
}

/**
 * Add a `contribution` to the list of `contributions` ensuring only one
 * contribution for each legislator.
 * @param {ContributionType[]} contributions list to which `contribution` will
 *    be added.
 * @param {ContributionType} contribution to be added.
 * @returns a copy of `contributions` containing `contribution`.
 */
function addContribution(contributions, contribution) {
  PropTypes.checkPropTypes(
    { contributions: PropTypes.arrayOf(ContributionType) },
    { contributions },
    'contributions',
    'store/contributions#addContribution'
  );
  PropTypes.checkPropTypes(
    { contribution: ContributionType },
    { contribution },
    'contribution',
    'store/contributions#addContribution'
  );
  const recipientIndex = contributions.findIndex(contrib =>
    isContributionMatch(contrib, contribution)
  );
  if (recipientIndex === -1) {
    return [...contributions, contribution];
  } else {
    return [
      ...contributions.slice(0, recipientIndex),
      ...contributions.slice(recipientIndex),
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
function handleByOrganization(state, action) {
  const { type, ...payload } = action;
  switch (type) {
    case RECEIVE_CONTRIBUTION_DATA:
      const { organization } = payload;
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
function handle(state = initialState, action) {
  const { type } = action;
  switch (type) {
    case RECEIVE_CONTRIBUTION_DATA:
      return {
        ...state,
        byOrganization: handleByOrganization(state.byOrganization, action),
      };
    default:
      return state;
  }
}

export default handle;
