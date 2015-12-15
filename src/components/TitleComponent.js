import React from 'react';
import cx from 'classnames';
import SenateStore from '../stores/SenateStore';
import {Settings} from '../constants/SenateConstants';

// Component
import BaseComponent from './BaseComponent';

// Styles
import style from './../styles/TitleComponent.scss';

class TitleComponent extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = SenateStore.getMember();
  }

  // Check whether user has initiated search before updating component
  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.did_search && nextState.number_representatives > 0) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const {
      desc,
      classes,
      front,
      represent,
      chamber,
      representative
    } = this.props;

    const {
      did_search,
    } = this.state;

    const {
      bill_desc,
      bill_title,
      voted_for,
      voted_against,
    } = Settings;

    let pre_text,
      represent_gender,
      preliminary_text,
      member_name = '',
      vote_question = `${bill_title}`,
      action,
      {represent_text} = Settings;

    const member = chamber === 'senate' ? 'Senator' : 'Representative';

    if (representative && representative.length === 1) {
      represent_gender = representative[0].gender_full === 'man' ? 'He' : 'She';
      member_name = representative[0].full_name;
      // Check for chamber in order to show correct verdict based on their vote since house and senate voted differently
      if (representative[0].chamber === 'house') {
        preliminary_text = representative[0].vote_favor ? `${voted_for.replace('#member_type', member).replace('#member_name', member_name).replace('#member_age', `a ${representative.age} old`).replace('#member_gender', representative.gender_full).replace('#action', action)}` : `${voted_against.replace('#member_type', member).replace('#member_name', member_name).replace('#member_age', `a ${representative.age} old`).replace('#member_gender', representative.gender_full).replace('#action', action)}`;
      } else if (representative[0].chamber === 'senate') {
        preliminary_text = representative[0].vote_favor ? `${voted_for.replace('#member_type', member).replace('#member_name', member_name).replace('#member_age', `a ${representative.age} old`).replace('#member_gender', representative.gender_full).replace('#action', action)}` : `${voted_against.replace('#member_type', member).replace('#member_name', member_name).replace('#member_age', `a ${representative.age} old`).replace('#member_gender', representative.gender_full).replace('#action', action)}`;
      }
    }

    if (representative && representative.length === 2) {
      represent_gender = 'These people';
      member_name = '';

      if (representative[0].chamber === 'house' && representative[1].chamber === 'house') {
        preliminary_text = representative[0].vote_favor ? `${voted_for.replace('#member_type', member).replace('#member_name', member_name).replace('#member_age', `a ${representative.age} old`).replace('#member_gender', representative.gender_full).replace('#action', action)}` : `${voted_against.replace('#member_type', member).replace('#member_name', member_name).replace('#member_age', `a ${representative.age} old`).replace('#member_gender', representative.gender_full).replace('#action', action)}`;
      } else if (representative[0].chamber === 'senate' && representative[1].chamber === 'senate') {
        preliminary_text = representative[0].vote_favor ? `${voted_for.replace('#member_type', member).replace('#member_name', member_name).replace('#member_age', `a ${representative.age} old`).replace('#member_gender', representative.gender_full).replace('#action', action)}` : `${voted_against.replace('#member_type', member).replace('#member_name', member_name).replace('#member_age', `a ${representative.age} old`).replace('#member_gender', representative.gender_full).replace('#action', action)}`;
      } else if (representative[0].chamber === 'house' && representative[1].chamber === 'senate') {
        preliminary_text = representative[0].vote_favor ? `${voted_for.replace('#member_type', member).replace('#member_name', member_name).replace('#member_age', `a ${representative.age} old`).replace('#member_gender', representative.gender_full).replace('#action', action)}` : `${voted_against.replace('#member_type', member).replace('#member_name', member_name).replace('#member_age', `a ${representative.age} old`).replace('#member_gender', representative.gender_full).replace('#action', action)}`;
      } else if (representative[0].chamber === 'senate' && representative[1].chamber === 'house') {
        preliminary_text = representative[0].vote_favor ? `${voted_for.replace('#member_type', member).replace('#member_name', member_name).replace('#member_age', `a ${representative.age} old`).replace('#member_gender', representative.gender_full).replace('#action', action)}` : `${voted_against.replace('#member_type', member).replace('#member_name', member_name).replace('#member_age', `a ${representative.age} old`).replace('#member_gender', representative.gender_full).replace('#action', action)}`;
      }
    }
    // Grab represents text as specific in Settings.json
    represent_text = `${represent_gender}  ${represent_text} your voice!`;

    // Make sure that vote_question is shown on frontpage and that result text is shown in follow. sections
    if (!did_search || desc && did_search) {
      vote_question = `${bill_title}`;
      pre_text = bill_desc;
    } else if (did_search && !desc || !desc) {
      pre_text = preliminary_text;
    }

    const titleClasses = cx(
      ['title-component', classes],
      {'uppercase': front},
    );

    const representClasses = cx(
      ['title-component__represent'],
      {'hide': !represent}
    );

    const starClasses = cx(
      ['title-component__star-divider'],
      {'hide': !represent}
    );

    const strikeClasses = cx(
      ['strike-out'],
      {'hide': represent}
    );

    const threeStars = cx(
      ['three-stars'],
      {'hide': represent}
    );

    return <div className={titleClasses}>
      <div className={threeStars}>
        <span>&#9733;</span>
        <span>&#9733;</span>
        <span>&#9733;</span>
      </div>
      <div className="title-component__description">
        {pre_text}
        <span className={strikeClasses}>
          {vote_question}
        </span>
      </div>
      <div className={starClasses}>
        <span>&#9733;</span>
      </div>
      <span className={representClasses}>
        {represent_text}
      </span>
    </div>;
  }
}

TitleComponent.propTypes = {
  chamber: React.PropTypes.string,
  classes: React.PropTypes.string,
  desc: React.PropTypes.bool,
  front: React.PropTypes.bool,
  represent: React.PropTypes.bool,
  representative: React.PropTypes.array
};

export default TitleComponent;
