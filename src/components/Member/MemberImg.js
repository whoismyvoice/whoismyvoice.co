import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { Legislator } from '../../models/Legislator';

// Assets
import './../../styles/SenatorImg.css';

class SenatorImg extends Component {
  static propTypes = {
    repNumber: PropTypes.number.isRequired,
    legislator: PropTypes.instanceOf(Legislator).isRequired,
  };

  render() {
    const { legislator, repNumber } = this.props;
    const party = legislator.party;

    const imgClasses = cx(
      ['member-img'],
      { animated: repNumber > 2 },
      { 'member--blue': party === 'D' },
      { 'member--grey': party === 'I' }
    );

    return (
      <div className={imgClasses}>
        <img alt={legislator.fullName} src={legislator.photoUrl} />
      </div>
    );
  }
}

SenatorImg.propTypes = {
  bioguide: PropTypes.string,
};

export default SenatorImg;
