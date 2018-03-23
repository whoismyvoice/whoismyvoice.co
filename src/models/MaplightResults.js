// @flow

import PropTypes from 'prop-types';

/**
 * The type for an aggregate total record in `MaplightResults` record.
 */
type MaplightAggregateTotal = {
  contributions: number,
  total_amount: number,
};

/**
 * Defines the type alias for a `MaplightResults` record.
 */
export type MaplightResultsRecord = {
  search_terms: {
    candidate_fec_id: string,
    donor: {
      donor_organization: string,
    },
    election_cycle: string,
  },
  data: {
    aggregate_totals: Array<MaplightAggregateTotal>,
  },
};

/**
 * Defines the `PropTypes` validation structure for API results from Maplight
 * search .
 */
export const PropType = PropTypes.shape({
  search_terms: PropTypes.shape({
    candidate_fec_id: PropTypes.string.isRequired,
    donor: PropTypes.shape({
      donor_organization: PropTypes.string.isRequired,
    }),
    election_cycle: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    aggregate_totals: PropTypes.arrayOf(
      PropTypes.shape({
        contributions: PropTypes.number.isRequired,
        total_amount: PropTypes.number.isRequired,
      })
    ),
  }),
});
