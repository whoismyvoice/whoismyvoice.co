import React from 'react';
import SenateActions from '../actions/SenateActions';
import cx from 'classnames';

// Component
import BaseComponent from './BaseComponent';
import TextButton from './TextButton';

// Styles
import style from './../styles/SearchInput.scss';

class SearchInput extends BaseComponent {
  constructor() {
    super();
    this._bind('_handleChange','_handleFocus', '_handleBlur', '_handleEnter', '_handleClick');
    this.state = {
      zip_code: '',
      error: false,
      placeholder: 'Enter Your Zip Code'
    }
  }
  _handleFocus() {
    this.setState({
      placeholder: '',
      error: false
    });
  }
  _handleBlur() {
    if (this.state.zip_code === '') {
      this.setState({
        placeholder: 'Enter Your Zip Code'
      });
    } else if(this.state.zip_code.length === 5) {
      this.setState({
        error: false,
        placeholder: 'Enter Your Zip Code',
        zip_code: ''
      });
      SenateActions.fetchDistricts(this.state.zip_code);
    }
  }
  _handleChange(event) {
    this.setState({
      zip_code: event.target.value,
      error: false,
      placeholder: 'Enter Your Zip Code'
    });
  }
  _handleEnter(e) {
    const zip_code = this.state.zip_code;
    if (e.keyCode === 13) {
      if ((isNaN(zip_code)) || (!isNaN(zip_code) && zip_code.length !== 5)) {
        this.setState({
          error: true,
          placeholder: 'Enter Your Zip Code',
          zip_code: ''
        });
      } else {
        SenateActions.fetchDistricts(zip_code);
        this.setState({
          error: false,
          zip_code: ''
        });
      }
    }
  }
  _handleClick(evt) {
    const zip_code = this.state.zip_code;
    evt.preventDefault();
    evt.stopPropagation();
    if ((isNaN(zip_code)) || (!isNaN(zip_code) && zip_code.length !== 5)) {
      this.setState({
        error: true
      });
    } else {
      this.setState({
        error: false,
        zip_code: ''
      });
      SenateActions.fetchDistricts(zip_code);
    }
  }
  render() {
    const inputClasses = cx(
      ['input'],
      {'error': this.state.error || this.props.error},
    );
    return <span>
      <input
        className={inputClasses}
        type="text"
        pattern="[0-9]*"
        value={this.state.zip_code}
        onChange={this._handleChange}
        onKeyDown={this._handleEnter}
        onFocus={this._handleFocus}
        placeholder={this.state.placeholder}
        onBlur={this._handleBlur}
      />
      <TextButton
        text="Continue"
        onClick={this._handleClick}
      />
    </span>;
  }
};

SearchInput.propTypes = {
  error: React.PropTypes.bool
};

export default SearchInput;
