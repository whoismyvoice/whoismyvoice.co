import React from 'react'
import { Link } from 'react-router'
import SenateStore from '../stores/SenateStore'
import SenateActions from '../actions/SenateActions'
import cx from 'classnames'
import ArrowDown from './ArrowDown'

// Styles
import style from './../styles/SearchInput.scss'

const SearchInput = React.createClass({
  getInitialState() {
	  return {
		  zip_code: '',
      error: false,
      fade: true
		}
	},

  _handleChange: function(event) {
    this.setState({
      zip_code: event.target.value,
      error: false,
      fade: false
    });
  },

  _handleEnter: function(e) {
    if (e.keyCode === 13) {
      if((isNaN(this.state.zip_code) && this.state.zip_code.length < 2) || (!isNaN(this.state.zip_code) && this.state.zip_code.length !== 5)) {
        this.setState({
          error: true,
          fade: false
        });
      } else {
        SenateActions.identifyMember(this.state.zip_code);
        this.setState({
          error: false,
          zip_code: '',
          fade: false
        });
      }
    }
  },

  _handleClick: function() {
    if ((isNaN(this.state.zip_code) && this.state.zip_code.length < 2) || (!isNaN(this.state.zip_code) && this.state.zip_code.length !== 5)) {
      this.setState({
        error: true,
        fade: false
      });
    } else {
      this.setState({
        error: false,
        zip_code: ''
      });
      SenateActions.identifyMember(this.state.zip_code);
    }
  },

  render() {
    let inputClasses = cx(
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
          placeholder="Enter Your Zip Code"
        />
        <button 
          className="arrowDown green-text spacing" 
          onClick={this._handleClick}>
        </button>
    </span>;
  }  
});

export default SearchInput;
