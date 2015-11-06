import React from 'react';
import cx from 'classnames';
import SenateConstants from '../constants/SenateConstants';

// Styles
import style from './../styles/Circle.scss';

const Circle = React.createClass({
  render() {
  	const additional = this.props.additional === null ? null : this.props.additional,
          proposition = additional === null ? 'a ' : '',
  	      details = (additional === null) ? this.props.age + ' year old ' + this.props.gender + ' ' : '',
          numRep = this.props.numRep;

    let title;

    if(SenateConstants.CHAMBER === 'house') {
      title = numRep > 1 ? 'Congressmen' : 'Congressman';
    } else {
      title = numRep > 1 ? 'Senator' : 'Senators';
    }

    const introductionClasses = cx(
      ['status'],
      {'hide': additional},
      {'hide': this.props.hide}
    );
  	
    return <div className={'circle ' + this.props.style}>
  		<div className="description">
        <div className={introductionClasses}>
  				{'Your ' + title} <br />
        </div>
        {proposition}
  			<span className="strike-out">
  				{details}
  			</span>
  			{this.props.desc}
  		</div>
  	</div>;
  }
});

export default Circle;
