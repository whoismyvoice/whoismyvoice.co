import React from 'react';
import SenateActions from '../actions/SenateActions';
import cx from 'classnames';

class SearchAddress extends React.Component {
  constructor() {
    super();
    this._handleChange = this._handleChange.bind(this);
    this._handleFocus = this._handleFocus.bind(this);
    this._handleBlur = this._handleBlur.bind(this);
    this._handleEnter = this._handleEnter.bind(this);
    this._handleClick = this._handleClick.bind(this);
    this.state = {
      address: '',
      error: false,
      placeholder: 'Enter Street Name'
    }
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
        SenateActions.fetchSpecificMember(this.state.address, this.props.zip_code);
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
      SenateActions.fetchSpecificMember(this.state.address, this.props.zip_code);
    }
  }

  render() {
    const inputClasses = cx(
      ['input'],
      {'error': this.state.error || this.props.error},
      {'fade': this.state.fade}
    );

    let color;

    if(this.props.color) {
      color = 'orange-text';
    } else {
      color = 'green-text';
    }

  	return <div>
  		<input
        className={`${inputClasses} ${this.props.color}`}
  			type="text"
        value={this.state.address}
  			placeholder={this.state.placeholder}
  			onChange={this._handleChange}
  			onKeyDown={this._handleEnter}
  			onFocus={this._handleFocus}
  			onBlur={this._handleBlur}
  		/>

      <button
        className={`arrowDown ${color} spacing`}
        onClick={this._handleClick}>
      </button>
  	</div>;
  }
};

SearchAddress.propTypes = {
  zip_code: React.PropTypes.string,
  error: React.PropTypes.bool
}

export default SearchAddress;
