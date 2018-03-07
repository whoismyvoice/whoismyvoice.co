import PropTypes from 'prop-types';

export const legislatorType = PropTypes.arrayOf(PropTypes.shape({
  id: PropTypes.shape({
    bioguide: PropTypes.string,
    fec: PropTypes.arrayOf(PropTypes.string),
  }),
  name: PropTypes.shape({
    first: PropTypes.string,
    last: PropTypes.string,
    official_full: PropTypes.string,
  }),
  bio: PropTypes.shape({
    birthday: PropTypes.string,
    gender: PropTypes.string,
  }),
  terms: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string,
    start: PropTypes.string,
    end: PropTypes.string,
    state: PropTypes.string,
    district: PropTypes.number,
    party: PropTypes.string,
  })),
}));