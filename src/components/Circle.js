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
    let title,
        status,
        desc = this.props.desc,
        state,
        representative;

    if(this.props.representatives) {
      representative = this.props.representatives[0];
    }

    const numRep = this.props.numRep,
          proposition = numRep === 1 ? 'a ' : '',
          details = numRep === 1 ? `${representative.age} year old ${representative.gender_full}` : '',
          several = numRep > 1 && Settings.chamber === 'house' ? ' several': '';

    if (numRep > 0 && Settings.chamber === 'senate') {
      status = representative.voted === 'Yea' ? 'Yes!' : 'No!';
      state = `from ${representative.state_name} `;
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

    return <div className={`circle ${this.props.style} ${several}`}>
  		<div className="description">
        {status}
        <div className={introductionClasses}>
          {`Your ${title}`}
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
