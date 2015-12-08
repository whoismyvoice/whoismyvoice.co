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
    if (nextState.did_search && Settings.chamber === 'house' && nextState.number_representatives === 1 || Settings.chamber === 'senate' && nextState.number_representatives > 0) {
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
      {pre_text} = Settings,
      final_char,
      represent_gender,
      member_name = '',
      vote_status = '',
      impact,
      action,
      member = chamber === 'senate' ? 'Senator' : 'Congressman',
      represent_text = 'represents';

    if (representatives) {
      representative = representatives[0];
      vote_status = `${bill_title}`;

      if (sponsor && representatives.length === 1) {
        action = representative.payment > 0 ? 'has received money' : 'has not received money';
      } else if (sponsor && representatives.length > 1) {
        if (representative.payment > 0 && representatives[1].payment > 0) {
          action = 'have both received money';
        } else if (representative.payment > 0 || representatives[1].payment > 0) {
          action = 'has received money';
        } else if (representative.payment === 0 && representatives[1].payment === 0) {
          action = 'have not received money';
        }
      } else if (!sponsor) {
        action = representative.voted === 'Yea' ? voted_for : voted_against;
      }

      if (representatives.length === 1) {
        impact = impact_text.replace('#gender_third', `this ${representative.gender_full}`);
        represent_gender = representative.gender_full === 'man' ? 'He' : 'She';
        member_name = representative.full_name;
      } else if (representatives.length > 1 && chamber === 'senate') {
        impact = impact_text.replace('#gender_third', `this person`);
        represent_gender = 'These people';
        represent_text = 'represent';
        member =  representative.payment > 0 || representatives[1].payment > 0 ? 'Senator from ' + representative.state_name : 'Senators from ' + representative.state_name;
      }
    }

    const preliminary_text = pre_text.replace('#member_type', member).replace('#member_name', member_name).replace('#action', action);

    if (!did_search || desc && did_search && !actions) {
      vote_status = `${bill_title}`;
      final_char = '?';
      pre_text = bill_desc.replace('#member', member_single);
    } else if (did_search && !desc || !desc) {
      pre_text = preliminary_text;
      final_char = '.';
    } else if (actions) {
      pre_text = impact;
      final_char = '';
    }

    const titleClasses = cx(
      ['title-component', classes],
      {'uppercase': front},
      {'title-component--wider': several}
    );

    const representClasses = cx(
      ['title-component__represent'],
      {'hide': !represent || several}
    );

    const starClasses = cx(
      ['title-component__star-divider'],
      {'hide': !represent || actions || several}
    );

    const strikeClasses = cx(
      ['strike-out'],
      {'white': represent || actions},
      {'hide': actions}
    );

    const threeStars = cx(
      ['three-stars'],
      {'hide': represent || actions}
    );

    return <div className={titleClasses}>
      <div className={threeStars}>
        <span>&#9733;</span>
        <span>&#9733;</span>
        <span>&#9733;</span>
      </div>
  		<div className="title-component__description">
        {`${pre_text} `}
        <span className={strikeClasses}>
          {vote_status}
        </span>
        {final_char}
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
