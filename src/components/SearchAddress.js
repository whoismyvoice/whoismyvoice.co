import React from 'react';
import SenateActions from '../actions/SenateActions';
import cx from 'classnames';

// Component
import BaseComponent from './BaseComponent';
import TextButton from './TextButton';

class SearchAddress extends BaseComponent {
  constructor() {
    super();
    this._bind('_handleChange', '_handleFocus', '_handleBlur', '_handleEnter', '_handleClick');
    this.state = {
      address: '',
      error: false,
      placeholder: 'Enter Street Name'
    };
  }
	_handleChange(event) {
    this.setState({
      address: event.target.value,
      error: false,
      placeholder: 'Enter Street Name'
    });
  }
  _handleFocus() {
    this.setState({
      placeholder: '',
      error: false
    });
  }
  _handleBlur() {
    if (this.state.address === '') {
      this.setState({
        placeholder: 'Enter Street Name'
      });
    }
  }
  _handleEnter(e) {
    if (e.keyCode === 13) {
      if (this.state.address.length < 4) {
        this.setState({
          error: true,
          placeholder: 'Enter Street Name',
          address: ''
        });
      } else {
        this.setState({
          error: false,
          placeholder: 'Enter Street Name',
          address: ''
        });
        SenateActions.fetchSpecificMember(this.state.address, this.props.zip_code, this.props.state_full);
      }
    }
  }
  _handleClick(evt) {
    evt.preventDefault();
    evt.stopPropagation();

    if (this.state.address < 4) {
      this.setState({
        error: true,
        placeholder: 'Enter Street Name',
        address: ''
      });
    } else {
      this.setState({
        error: false,
        address: ''
      });
      SenateActions.fetchSpecificMember(this.state.address, this.props.zip_code, this.props.state_full);
    }
  }
  render() {
    const inputClasses = cx(
      ['input'],
      {'error': this.state.error || this.props.error}
    );

  	return <div>
  		<input
        className={inputClasses}
  			type="text"
        value={this.state.address}
  			placeholder={this.state.placeholder}
  			onChange={this._handleChange}
  			onKeyDown={this._handleEnter}
  			onFocus={this._handleFocus}
  			onBlur={this._handleBlur}
  		/>
      <div className="line-seperator"></div>
      <TextButton
        text="Continue"
        onClick={this._handleClick}
      />
  	</div>;
  }
}

SearchAddress.propTypes = {
  error: React.PropTypes.bool,
  zip_code: React.PropTypes.string
};

export default SearchAddress;
