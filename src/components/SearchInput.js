import React from 'react';
import { Link } from 'react-router';
import SenateStore from '../stores/SenateStore';
import SenateActions from '../actions/SenateActions';
import cx from 'classnames';

// Styles
import style from './../styles/SearchInput.scss';

const SearchInput = React.createClass({
  getInitialState() {
	  return {
		  zip_code: '',
      error: false
		}
	},

   _handleChange: function(event) {
    this.setState({
      zip_code: event.target.value
    });
  },

  _handleEnter: function(e) {
    if(e.keyCode === 13) {
      if(isNaN(this.state.zip_code) && this.state.zip_code.length < 2) {
        this.setState({
          error: true
        });
      } else if(!isNaN(this.state.zip_code) && this.state.zip_code.length !== 5) {
        this.setState({
          error: true
        });
      } else {
        this.setState({
          error: false
        });
        SenateActions.identifyMember(this.state.zip_code);
      }
    }
  },

  render() {

    var inputClasses = cx(
      ['input'], 
      {'error': this.state.error }
    );

    return <input 
        className={inputClasses}
        type="text" 
        value={this.state.zip_code}
        onChange={this._handleChange}
        onKeyDown={this._handleEnter}
        placeholder="Enter Your Zip Code"
      />;
  }  
});

export default SearchInput;
