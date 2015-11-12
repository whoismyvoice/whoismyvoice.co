import React from 'react';
import cx from 'classnames';

class FadedBG extends React.Component {

  constructor() {
    super();
    this._handleScroll = this._handleScroll.bind(this);
    this.state = {
      did_scroll: false
    };
  }

	componentDidMount() {
    window.addEventListener('scroll', this._handleScroll);
  }

  componentWillUnmount() {
  	window.removeEventListener('scroll', this._handleScroll);
  }

  _handleScroll() {
  	if ($(document).scrollTop() > 50) {
  		this._addScrollState();
  	} else {
  		this._disruptScroll();
  	}
  }

  _disruptScroll() {
  	this.setState({
  		did_scroll: false
  	});
  }

  _addScrollState() {
  	this.setState({
  		did_scroll: true
  	});
  }

  render() {
  	const fadedClasses = cx(
      ['faded-bg'],
      {'faded-red': this.props.color === 'red'},
      {'faded-blue': this.props.color === 'blue'},
      {'faded-green': this.props.color === 'green'},
      {'hide': !this.state.did_scroll}
    );
  	return <div className={fadedClasses}></div>;
  }
};

FadedBG.propTypes = {
  color: React.PropTypes.string
}

export default FadedBG;
