import React from 'react';
import cx from 'classnames';
import Settings from '../data/settings.json';
import ReactFitText from 'react-fittext';

// Component
import BaseComponent from './BaseComponent';

// Styles
import style from './../styles/Circle.scss';

class Circle extends BaseComponent {
  render() {
    let title,
        status,
        state,
        representative,
        description = this.props.desc;

    if(this.props.representatives) {
      representative = this.props.representatives[0];
    }

    const {numRep, style, hide, desc} = this.props,
          proposition = numRep === 1 ? 'a ' : '',
          details = numRep === 1 ? `${representative.age} year old ${representative.gender_full}` : '';

    if (numRep > 0 && Settings.chamber === 'senate') {
      status = representative.voted === 'Yea' ? 'Yes!' : 'No!';
      state = `from ${representative.state_name} `;
    } else {
      description = numRep > 1 ? '' : desc;
    }

    if (Settings.chamber === 'house') {
      title = 'Representative';
      status = '';
    } else {
      title = numRep > 1 ? 'Senators' : 'Senator';
    }

    const introductionClasses = cx(
      ['status'],
      {'hide': hide}
    );

    return <div className={`circle ${style}`}>
      <ReactFitText compressor={1.2}>
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
          {description}
  		  </div>
      </ReactFitText>
  	</div>;
  }
};

Circle.propTypes = {
  desc: React.PropTypes.string,
  hide: React.PropTypes.bool,
  numRep: React.PropTypes.number,
  representatives: React.PropTypes.array,
  style: React.PropTypes.string
};

export default Circle;
