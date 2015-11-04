import React from 'react';
import SenateActions from '../actions/SenateActions';

const SearchAddress = React.createClass({

	getInitialState(){
	 	return {
		  address: '',
      error: false,
      placeholder: 'Enter Street Name',
      zip_code: this.props.zip_code
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
      placeholder: ''
    });
  },

  _handleBlur: function() {
    if (this.state.address === '')
    this.setState({
      placeholder: 'Enter Street Name'
    });
  },

  _handleEnter: function(e) {
    if (e.keyCode === 13) {
      if (this.state.address < 4) {
        this.setState({
          error: true,
          placeholder: 'Enter Street Name',
          address: ''
        });
      } else {
        SenateActions.fetchSpecificMember(this.state.address, this.state.zip_code);
        this.setState({
          error: false,
          address: '',
        });
      }
    }
  },

  render() {
  	return <div>
  		<input 
  			type="text"
  			placeholder={this.state.placeholder}
  			onChange={this._handleChange}
  			onKeyDown={this._handleEnter}
  			onFocus={this._handleFocus}
  			onBlur={this._handleBlur}
  		/>
  	</div>;
  }
});

export default SearchAddress;
