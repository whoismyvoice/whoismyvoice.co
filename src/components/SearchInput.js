import React from 'react';
import { Link } from 'react-router';

// Styles
import style from './../styles/SearchInput.scss';

const SearchInput = React.createClass({
  getInitialState() {
	  return {
		  zip_code: ''
		}
	},
  render() {
    return (
    	<input 
        type="text" 
        value={this.state.zip_code}
        onChange={this._handleChange}
        onKeyDown={this._catchEnter}
        placeholder="Enter Your Zip Code"
      />
    );
  },
  _handleChange: function(event) {
    this.setState({
      zip_code: event.target.value,
    });
  },
  _catchEnter: function(e) {
    if(e.keyCode === 13) {
      console.log("Search for " + this.state.zip_code)
    }
  }
});

export default SearchInput;
