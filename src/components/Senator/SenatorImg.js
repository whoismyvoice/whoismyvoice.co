import React from 'react';

// Styles
import style from './../../styles/SenatorImg.scss';

const SenatorImg = React.createClass({
  propTypes: {
    bioguide: React.PropTypes.string,
    single: React.PropTypes.bool
  },
  render() {
  	const img = `https://raw.githubusercontent.com/unitedstates/images/gh-pages/congress/225x275/${this.props.bioguide}.jpg`,
          single = this.props.single === true ? 'single': '';

  	return <div className={`senatorImg ${single}`}>
    	<img src={img} />
    </div>;
  }
});

export default SenatorImg;
