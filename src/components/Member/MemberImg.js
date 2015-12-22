import React from 'react';
import cx from 'classnames';

// Component
import BaseComponent from '../BaseComponent';

// Styles
import style from './../../styles/SenatorImg.scss';

class SenatorImg extends BaseComponent {
  render() {
    const img = require(`../../img/congress/${this.props.bioguide}.jpg`);

    const {repNumber, party} = this.props;

    const imgClasses = cx(
      ['member-img'],
      {'animated': repNumber > 2},
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
