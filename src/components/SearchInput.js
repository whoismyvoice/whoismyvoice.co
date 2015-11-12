import React from 'react';
import SenateActions from '../actions/SenateActions';
import cx from 'classnames';

// Styles
import style from './../styles/SearchInput.scss';

class SearchInput extends React.Component {
  constructor() {
    super();
    this._handleChange = this._handleChange.bind(this);
    this._handleFocus = this._handleFocus.bind(this);
    this._handleBlur = this._handleBlur.bind(this);
    this._handleEnter = this._handleEnter.bind(this);
    this._handleClick = this._handleClick.bind(this);
    this.state = {
      zip_code: '',
      error: false,
      fade: true,
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
    }
  }

  _handleChange(event) {
    this.setState({
      zip_code: event.target.value,
      error: false,
      fade: false,
      placeholder: 'Enter Your Zip Code'
    });
  }

  _handleEnter(e) {
    const zip_code = this.state.zip_code;
    if (e.keyCode === 13) {
      if ((isNaN(zip_code)) || (!isNaN(zip_code) && zip_code.length !== 5)) {
        this.setState({
          error: true,
          fade: false,
          placeholder: 'Enter Your Zip Code',
          zip_code: ''
        });
      } else {
        SenateActions.fetchDistricts(zip_code);
        this.setState({
          error: false,
          zip_code: '',
          fade: false
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
        error: true,
        fade: false
      });
    } else {
      this.setState({
        error: false,
        zip_code: '',
        fade: false
      });
      SenateActions.fetchDistricts(zip_code);
    }
  }

  render() {
    const inputClasses = cx(
      ['input'],
      {'error': this.state.error || this.props.error},
      {'fade': this.state.fade}
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
      <button
        className="arrowDown green-text spacing"
        onClick={this._handleClick}>
      </button>
    </span>;
  }
};

SearchInput.propTypes = {
  error: React.PropTypes.bool
};

export default SearchInput;
