import PropTypes from 'prop-types';

/**
 * Defines the `PropTypes` validation structure for a `Legislator` record.
 */
export const PropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
});
