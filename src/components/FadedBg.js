import React from 'react'
import cx from 'classnames'

const FadedBG = React.createClass({
	getInitialState() {
	  return {
		  did_scroll: false
		}
	},
	componentDidMount: function() {
    window.addEventListener('scroll', this._handleScroll);
  },

  componentWillUnmount: function() {
  	window.removeEventListener('scroll', this._handleScroll);
  },

  _handleScroll: function() {
  	if($(document).scrollTop() > 50) {
  		this._addScrollState();
  	} else {
  		this._disruptScroll();
  	}
  },

  _disruptScroll: function() {
  	this.setState({
  		did_scroll: false
  	})
  },

  _addScrollState: function() {
  	this.setState({
  		did_scroll: true
  	})
  },

  render() {
  	
  	let fadedClasses = cx(
      ['faded-bg'],
      {'faded-red': this.props.color === 'red'},
      {'faded-blue': this.props.color === 'blue'},
      {'faded-green': this.props.color === 'green'},
      {'hide': !this.state.did_scroll}
    );

  	return  <div className={fadedClasses}></div>
  }
});

export default FadedBG;
