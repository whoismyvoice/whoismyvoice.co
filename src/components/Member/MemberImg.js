import React from 'react';
import cx from 'classnames';

// Component
import BaseComponent from '../BaseComponent';

// Styles
import style from './../../styles/SenatorImg.scss';

class SenatorImg extends BaseComponent {
  render() {
    const img = `https://raw.githubusercontent.com/unitedstates/images/gh-pages/congress/225x275/${this.props.bioguide}.jpg`;

    const {chamber, repNumber, party} = this.props;

    const imgClasses = cx(
      ['member-img'],
      {'animated': chamber === 'house' && repNumber === 1 || chamber === 'senate' && repNumber > 0},
      {'member--blue': party === 'D'}
    );

    return <div className={imgClasses}>
    	<img src={img} />
    </div>;
  }
}

SenatorImg.propTypes = {
  bioguide: React.PropTypes.string,
};

export default SenatorImg;
