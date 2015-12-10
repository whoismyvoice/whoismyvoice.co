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

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.did_search && Settings.chamber === 'house' && nextState.number_representatives === 1 || Settings.chamber === 'senate' && nextState.number_representatives > 0) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const {
      desc,
      actions,
      classes,
      front,
      represent,
      several
    } = this.props;

    const {
      did_search,
      representatives
    } = this.state;

    const {
      chamber,
      bill_desc,
      bill_title,
      impact_text,
      voted_for,
      voted_against,
      sponsor
    } = Settings,
      member_single = chamber === 'senate' ? 'Senator' : 'Congressman';

    let representative,
      pre_text,
      represent_gender,
      preliminary_text,
      member_name = '',
      vote_question = '',
      impact,
      action,
      member = chamber === 'senate' ? 'Senator' : 'Congressional Representative',
      represent_text = 'represents';

    if (representatives) {
      representative = representatives[0];
      vote_question = representatives.length >= 1 ? '' : `${bill_title}`;

      if (sponsor && representatives.length === 1) {
        action = representative.payment > 0 ? `accepted $${representative.payment} in campaign contributions from the NRA in the 2013-2014 election season` : 'has not received money';
      } else if (sponsor && representatives.length > 1) {
        if (representative.payment > 0 && representatives[1].payment > 0) {
          action = 'have both received money';
        } else if (representative.payment > 0 || representatives[1].payment > 0) {
          action = 'has received money';
        } else if (representative.payment === 0 && representatives[1].payment === 0) {
          action = 'have not received money';
        }
      }

      if (representatives.length === 1) {
        impact = impact_text.replace('#gender_third', `this ${representative.gender_full}`);
        represent_gender = representative.gender_full === 'man' ? 'He' : 'She';
      } else if (representatives.length > 1) {
        member = chamber === 'senate' ? 'Senators' : 'Congressional Representatives';
        impact = impact_text.replace('#gender_third', `this person`);
      }

      if (!sponsor && representatives.length === 1) {
        member_name = representative.full_name;
        preliminary_text = representative.voted === 'Yea' ? `${voted_for.replace('#member_type', member).replace('#member_name', member_name).replace('#member_age', `a ${representative.age} old`).replace('#member_gender', representative.gender_full).replace('#action', action)}` : `${voted_against.replace('#member_type', member).replace('#member_name', member_name).replace('#member_age', `a ${representative.age} old`).replace('#member_gender', representative.gender_full).replace('#action', action)}`;
      } else if (sponsor && representatives.length >= 1) {
        const member_payment = `$${representative.payment}`;
        preliminary_text = representative.payment > 0 ? `${voted_for.replace('#member_type', member).replace('#member_name', member_name).replace('#member_age', `a ${representative.age} old`).replace('#member_gender', representative.gender_full).replace('#action', action).replace('#member_payment', member_payment)}` : `${voted_against.replace('#member_type', member).replace('#member_name', member_name).replace('#member_age', `a ${representative.age} old`).replace('#member_gender', representative.gender_full).replace('#action', action)}`;
      } else if (!sponsor && representatives.length > 1 && chamber === 'senate') {
        preliminary_text = representative.voted === 'Yea' ? `${voted_for.replace('#member_type', member).replace('#member_name', '').replace('#member_age', '').replace('#member_gender', '').replace('#action', action)}` : `${voted_against.replace('#member_type', member).replace('#member_name', member_name).replace('#member_age', ``).replace('#member_gender', '').replace('#action', action)}`;
      }
    }

    if (!did_search || desc && did_search && !actions) {
      vote_question = `${bill_title}`;
      pre_text = bill_desc.replace('#member', member_single);
    } else if (did_search && !desc || !desc) {
      pre_text = preliminary_text;
    } else if (actions) {
      pre_text = impact;
    }

    const titleClasses = cx(
      ['title-component', classes],
      {'uppercase': front},
      {'title-component--wider': several}
    );

    const representClasses = cx(
      ['title-component__represent'],
      {'hide': !represent || several || sponsor}
    );

    const starClasses = cx(
      ['title-component__star-divider'],
      {'hide': !represent || actions || several}
    );

    const strikeClasses = cx(
      ['strike-out'],
      {'white': represent || actions},
      {'hide': actions}
    );

    const threeStars = cx(
      ['three-stars'],
      {'hide': represent || actions}
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
        {`${represent_gender}  ${represent_text} your voice!`}
      </span>
    </div>;
  }
}

TitleComponent.propTypes = {
  actions: React.PropTypes.bool,
  classes: React.PropTypes.string,
  desc: React.PropTypes.bool,
  front: React.PropTypes.bool,
  represent: React.PropTypes.bool
};

export default TitleComponent;
