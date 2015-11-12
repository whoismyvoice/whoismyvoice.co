import React from 'react';
import SenateActions from '../actions/SenateActions';
import cx from 'classnames';

const SearchAddress = React.createClass({
	getInitialState() {
	 	return {
		  address: '',
      error: false,
      placeholder: 'Enter Street Name',
		};
	},
	_handleChange: function(event) {
    this.setState({
      address: event.target.value,
      error: false,
      placeholder: 'Enter Street Name'
    });
  },
  _handleFocus: function() {
    this.setState({
      placeholder: '',
      error: false
    });
  },
  _handleBlur: function() {
    if (this.state.address === '') {
      this.setState({
        placeholder: 'Enter Street Name'
      });
    }
  },
  _handleEnter: function(e) {
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
  },

  _handleClick: function(evt) {
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
  },

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
});

SearchAddress.propTypes = {
  zip_code: React.PropTypes.string,
  error: React.PropTypes.string
}

export default SearchAddress;
