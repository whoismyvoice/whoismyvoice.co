import React, { Component, } from 'react';
import PropTypes from 'prop-types';

class ControlledTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.initialValue,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value,
    });
  }

  render() {
    const { value, } = this.state;
    return (
      <input
        type="text"
        {...this.props}
        value={value}
      />
    );
  }
}

ControlledTextInput.defaultProps = {
  initialValue: '',
};

ControlledTextInput.propTypes = {
  initialValue: PropTypes.string.isRequired,
};

export default ControlledTextInput;