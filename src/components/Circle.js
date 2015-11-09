import React from 'react';
import cx from 'classnames';
import SenateConstants from '../constants/SenateConstants';

// Styles
import style from './../styles/Circle.scss';

const Circle = React.createClass({

  propTypes: {
    desc: React.PropTypes.string,
    hide: React.PropTypes.bool,
    numRep: React.PropTypes.number,
    representatives: React.PropTypes.object,
    style: React.PropTypes.string
  },
  render() {
    const numRep = this.props.numRep,
          proposition = this.props.representatives !== null && numRep === 1 ? 'a ' : '',
          details = this.props.representatives !== null && numRep === 1 ? this.props.representatives[0].age + ' year old ' + this.props.representatives[0].gender_full + ' ' : '',
          several = numRep > 1 && SenateConstants.CHAMBER === 'house' ? ' several': '';

    let title,
        status,
        desc,
        state;

    if (numRep > 0 && SenateConstants.CHAMBER === 'senate') {
      status = this.props.representatives[0].voted === 'Yea' ? 'Yes!' : 'No!';
      desc = this.props.representatives[0].voted === 'Yea' ? 'co-sponsored the bill to defund Planned Parenthood.' : 'support Planned Parenthood!';
      state = 'from ' + this.props.representatives[0].state_name + ' ';
    } else {
      desc = this.props.numRep > 1 ? '' : this.props.desc;
    }

    if (SenateConstants.CHAMBER === 'house') {
      title = numRep > 1 ? 'representatives' : 'representative';
      status = '';
    } else {
      title = numRep > 1 ? 'senators' : 'senator';
    }

    const introductionClasses = cx(
      ['status'],
      {'hide': this.props.hide}
    );

    return <div className={'circle ' + this.props.style + several}>
  		<div className="description">
        {status}
        <div className={introductionClasses}>
          {'Your ' + title}
        </div>
        {proposition}
        {state}
  			<span className="strike-out">
          {details}
  			</span>
        {desc}
  		</div>
  	</div>;
  }
});

export default Circle;
