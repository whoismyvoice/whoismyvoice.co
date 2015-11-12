import React from 'react';

// Component
import BaseComponent from '../BaseComponent';

// Styles
import style from './../../styles/SenatorImg.scss';

class SenatorImg extends BaseComponent {
  render() {
  	const img = `https://raw.githubusercontent.com/unitedstates/images/gh-pages/congress/225x275/${this.props.bioguide}.jpg`,
          single = this.props.single === true ? 'single': '';

  	return <div className={`senatorImg ${single}`}>
    	<img src={img} />
    </div>;
  }
};

SenatorImg.propTypes = {
  bioguide: React.PropTypes.string,
  single: React.PropTypes.bool
};

export default SenatorImg;
