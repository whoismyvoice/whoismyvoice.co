import React, { Component, } from 'react';
import PropTypes from 'prop-types';

// Assets
import '../../styles/SearchInput.css';

const isUsZip = /^(\d{5})(-\d{4})?$/;

class SearchInput extends Component {
  state = {
    isError: false,
  }

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    const target = event.target;
    const value = target.value;
    this.setState({
      isError: value !== null && value !== '' && !isUsZip.test(value),
    });
  }

  render() {
    const { name, pattern, placeholder, } = this.props;
    const { isError, } = this.state;
    return (
      <input
        type="text"
        name={name}
        className={isError ? 'error' : ''}
        pattern={pattern}
        placeholder={placeholder}
        onChange={this.onChange}
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
