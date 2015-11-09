import React from 'react';
import cx from 'classnames';
import Settings from '../data/settings.json';

// Styles
import style from './../styles/Circle.scss';

const Circle = React.createClass({

  propTypes: {
    desc: React.PropTypes.string,
    hide: React.PropTypes.bool,
    numRep: React.PropTypes.number,
    representatives: React.PropTypes.array,
    style: React.PropTypes.string
  },
  render() {
    const numRep = this.props.numRep,
          proposition = this.props.representatives !== null && numRep === 1 ? 'a ' : '',
          details = this.props.representatives !== null && numRep === 1 ? `${this.props.representatives[0].age} year old ${this.props.representatives[0].gender_full} ` : '',
          several = numRep > 1 && Settings.chamber === 'house' ? ' several': '';

    let title,
        status,
        desc,
        state;

    if (numRep > 0 && Settings.chamber === 'senate') {
      status = this.props.representatives[0].voted === 'Yea' ? 'Yes!' : 'No!';
      state = `from ${this.props.representatives[0].state_name} `;
      desc = this.props.desc;
    } else {
      desc = this.props.numRep > 1 ? '' : this.props.desc;
    }

    if (Settings.chamber === 'house') {
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
  			<span className="strike-out">
          {details}
  			</span>
        {state}
        {desc}
  		</div>
  	</div>;
  }
});

export default Circle;
