import React from 'react';

// Component
import BaseComponent from '../BaseComponent';

// Styles
import style from './../../styles/SenatorImg.scss';

class SenatorImg extends BaseComponent {
  render() {
  	const img = `https://raw.githubusercontent.com/unitedstates/images/gh-pages/congress/225x275/${this.props.bioguide}.jpg`;

  	return <div className="senatorImg">
      <div className="img-border">
      </div>
    	<img src={img} />
    </div>;
  }
};

SenatorImg.propTypes = {
  bioguide: React.PropTypes.string,
};

export default SenatorImg;
