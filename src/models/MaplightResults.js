import PropTypes from 'prop-types';

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
