// @flow

import PropTypes from 'prop-types';

/**
 * Defines the type alias for a `Contribution` record.
 */
export type ContributionRecord = {
  amount: number,
  legislatorId: string,
  organization: string,
};

/**
 * Defines the `PropTypes` validation structure for a `Contribution` record.
 */
export const PropType = PropTypes.shape({
  amount: PropTypes.number.isRequired,
  legislatorId: PropTypes.string.isRequired,
  organization: PropTypes.string.isRequired,
});
