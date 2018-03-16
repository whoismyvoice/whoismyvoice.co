import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Assets
import '../../styles/SearchInput.css';

const isUsZip = /^(\d{5})(-\d{4})?$/;

class SearchInput extends Component {
  state = {
    isError: false,
  };

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
      isError: props.errorMessage !== undefined,
    };
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.errorMessage !== undefined) {
      this.setState({
        isError: true,
      });
    }
  }

  onChange(event) {
    const target = event.target;
    const value = target.value;
    this.setState({
      isError: value !== null && value !== '' && !isUsZip.test(value),
    });
  }

  renderError() {
    const { errorMessage } = this.props;
    return errorMessage === undefined ? null : (
      <p className="search-input-message--error">{errorMessage}</p>
    );
  }

  render() {
    const { name, pattern, placeholder } = this.props;
    const { isError } = this.state;
    return (
      <React.Fragment>
        {this.renderError()}
        <input
          type="text"
          name={name}
          className={isError ? 'error' : ''}
          pattern={pattern}
          placeholder={placeholder}
          onChange={this.onChange}
        />
      </React.Fragment>
    );
  }
}

SearchInput.defaultProps = {
  errorMessage: undefined,
  pattern: '[0-9]*',
  placeholder: 'Enter Your Zip Code',
};

SearchInput.propTypes = {
  errorMessage: PropTypes.string,
  name: PropTypes.string.isRequired,
  pattern: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default SearchInput;
