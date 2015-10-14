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

  render() {

    var inputClasses = cx(
      ['input'], 
      {'error': this.state.error }
    );

    return (

    	<input 
        className={inputClasses}
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
      zip_code: event.target.value
    });
  },

  _catchEnter: function(e) {
    if(e.keyCode === 13) {
      if(this.state.zip_code.length === 5) {
        this.setState({
          error: false
        });

        SenateActions.identifyMember(this.state.zip_code);
      } else {

        this.setState({
          error: true
        });

      } 
    }
  }
  
});

export default SearchInput;
