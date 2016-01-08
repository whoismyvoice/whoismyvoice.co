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
      representative
    } = this.props;

    const {
      did_search,
    } = this.state;

    const {
      bill_desc,
      bill_title,
      voted_for,
      voted_for_1,
      voted_for_2,
      voted_against_1,
      voted_against_2,
      voted_against_3,
      voted_against_4,
      voted_against,
    } = Settings;

    let pre_text,
      preliminary_text,
      member_name = '',
      vote_question = `${bill_title}`,
      action,
      member,
      voted_bold_text,
      voted_final_text,
      voted_link,
      voted_finish;

    if (representative && representative.length === 1) {
      member_name = representative[0].full_name;
      member = representative[0].chamber === 'senate' ? 'Senator' : 'Representative';
      preliminary_text = representative[0].payment > 0 ? `${voted_for.replace('#member_type', member).replace('#member_name', member_name).replace('#member_age', `a ${representative.age} old`).replace('#member_gender', representative.gender_full).replace('#action', action).replace('#bold', '<b>').replace('#bold_end', '</b>')}` : `${voted_against.replace('#member_type', member).replace('#member_name', member_name).replace('#member_age', `a ${representative.age} old`).replace('#member_gender', representative.gender_full).replace('#action', action)}`;
      voted_bold_text = representative[0].payment > 0 ? voted_for_1 : voted_against_1;
      voted_final_text = representative[0].payment > 0 ? voted_for_2 : voted_against_2;
      voted_link = representative[0].payment > 0 ? '' : voted_against_3;
      voted_finish = representative[0].payment > 0 ? '' : voted_against_4;
    }

    if (representative && representative.length === 2) {
      const first_member = representative[0];
      const second_member = representative[1];

      if (first_member.chamber === 'senate' && second_member.chamber === 'senate') {
        if (first_member.payment > 0 && second_member.payment === 0 || first_member.payment === 0 && second_member.payment > 0) {
          member = `Senator ${first_member.full_name}`;
        } else {
          member = 'Senators';
        }
      } else if (first_member.chamber === 'house' && second_member.chamber === 'senate') {
        if (first_member.payment > 0) {
          member = `Representative ${first_member.full_name}`;
        } else if (second_member.payment > 0) {
          member = `Senator ${second_member.full_name}`;
        } else {
          member = 'Representative & Senator';
        }
      } else if (first_member.chamber === 'senate' && second_member.chamber === 'house') {
        if (first_member.payment > 0) {
          member = `Senator ${first_member.full_name}`;
        } else if (second_member.payment > 0) {
          member = `Representative ${second_member.full_name}`;
        } else {
          member = 'Representative & Senator';
        }
      }
      member_name = '';

      preliminary_text = representative[0].payment > 0 || representative[1].payment > 0 ? `${voted_for.replace('#member_type', member).replace('#member_name', member_name).replace('#member_age', `a ${representative.age} old`).replace('#member_gender', representative.gender_full).replace('#action', action)}` : `${voted_against.replace('#member_type', member).replace('#member_name', member_name).replace('#member_age', `a ${representative.age} old`).replace('#member_gender', representative.gender_full).replace('#action', action)}`;
      voted_bold_text = representative[0].payment > 0 || representative[1].payment > 0 ? voted_for_1 : voted_against_1;
      voted_final_text = representative[0].payment > 0 || representative[1].payment > 0 ? voted_for_2 : voted_against_2;
      voted_link = representative[0].payment > 0 || representative[1].payment > 0 ? '' : voted_against_3;
      voted_finish = representative[0].payment > 0 || representative[1].payment > 0 ? '' : voted_against_4;
    }

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

    const boldClasses = cx(
      ['bold'],
      {'hide': front}
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
        <span className={boldClasses}>
          <b>{voted_bold_text}</b>
        </span>
        {voted_final_text}
        <a
          href="http://www.washingtonpost.com/wp-srv/special/politics/gun-legislation-where-lawmakers-stand/
        ">
          {voted_link}
        </a>
        {voted_finish}
        <span className={strikeClasses}>
          {vote_question}
        </span>
      </div>
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
