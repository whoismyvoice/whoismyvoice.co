import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

class FadedBG extends Component {
  render() {
    const fadedClasses = cx(['faded-bg'], {
      'faded-white': this.props.color === 'white',
      hide: !this.props.didScroll,
    });
    return <div className={fadedClasses} />;
  }
}

FadedBG.propTypes = {
  color: PropTypes.string,
};

export default FadedBG;
