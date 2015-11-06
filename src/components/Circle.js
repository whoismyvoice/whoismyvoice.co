import React from 'react';
import cx from 'classnames';
import SenateConstants from '../constants/SenateConstants';

// Styles
import style from './../styles/Circle.scss';

const Circle = React.createClass({
  render() {
  	let numRep = this.props.numRep,
        proposition = this.props.representatives !== null && numRep === 1 ? 'a ' : '',
        details = this.props.representatives !== null && numRep === 1 ? this.props.representatives[0].age + ' year old ' + this.props.representatives[0].gender_full + ' ' : '',
        desc = this.props.numRep > 1 ? '' : this.props.desc,
        title,
        several = numRep > 1 ? ' several': '';

    if(SenateConstants.CHAMBER === 'house') {
      title = numRep > 1 ? 'representatives' : 'representative';
    } else {
      title = numRep > 1 ? 'senator' : 'senators';
    }

    const introductionClasses = cx(
      ['status'],
      {'hide': this.props.hide}
    );
  	
    return <div className={'circle ' + this.props.style + several}>
  		<div className="description">
        <div className={introductionClasses}>
  				{'Your ' + title} <br />
        </div>
        {proposition}
  			<span className="strike-out">
  				{details}
  			</span>
  			{desc}
  		</div>
  	</div>;
  }
});

export default Circle;
