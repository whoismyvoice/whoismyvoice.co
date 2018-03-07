import React, { Component, } from 'react';
import PropTypes from 'prop-types';

// Assets
import '../../styles/SearchInput.css';

class SearchInput extends Component {
  render() {
    const { name, pattern, placeholder, } = this.props;
    return (
      <input
        type="text"
        name={name}
        pattern={pattern}
        placeholder={placeholder}
      />
    );
  }
}

SearchInput.defaultProps = {
  pattern: '[0-9]*',
  placeholder: 'Enter Your Zip Code',
};

SearchInput.propTypes = {
  name: PropTypes.string.isRequired,
  pattern: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default SearchInput;