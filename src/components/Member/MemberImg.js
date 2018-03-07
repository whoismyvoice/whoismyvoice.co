import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

// Assets
import './../../styles/SenatorImg.css';

class SenatorImg extends Component {
  render() {
    const img = require(`../../img/congress/${this.props.bioguide}.jpg`);

    const {
      repNumber,
      party,
    } = this.props;

    const imgClasses = cx(
      ['member-img'],
      {'animated': repNumber > 2},
      {'member--blue': party === 'D'},
      {'member--grey': party === 'I'}
    );

    return (
      <div className={imgClasses}>
      	<img alt="" src={img} />
      </div>
    );
  }
}

SenatorImg.propTypes = {
  bioguide: PropTypes.string,
};

export default SenatorImg;
