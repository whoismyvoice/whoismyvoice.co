import React from 'react';
import cx from 'classnames';
import SenateStore from '../stores/SenateStore';
import Settings from '../data/settings.json';

// Component
import BaseComponent from './BaseComponent';

// Styles
import style from './../styles/TitleComponent.scss';

class TitleComponent extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = SenateStore.getMember();
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
      settings
    } = this.state;

    const {chamber, bill_desc, vote_focus, impact_text, vote_favor, voted_for, voted_against} = settings ? settings : Settings,
      member_single = chamber === 'senate' ? 'Senator': 'Congressman';

    let representative,
      {pre_text} = settings ? settings : Settings,
      final_char,
      represent_gender,
      member_name = '',
      vote_status = '',
      impact,
      action,
      member = chamber === 'senate' ? 'Senator': 'Congressman',
      represent_text = 'represents';

    if (this.state.representatives) {
      representative = this.state.representatives[0];
      vote_status = `${vote_focus}`;
      action = representative.voted === 'Nay' ? voted_against : voted_for;

      if (this.state.representatives.length === 1) {
        impact = impact_text.replace('#gender_third', `this ${representative.gender_full}`);
        represent_gender = representative.gender_full === 'man' ? 'He' : 'She';
        member_name = representative.full_name;
      } else if (this.state.representatives.length > 1) {
        impact = impact_text.replace('#gender_third', `this person`);
        represent_gender = 'These people';
        represent_text = 'represent';
        member = chamber === 'senate' ? 'Senators from '+representative.state_name : 'Representatives from '+representative.state_name;
      }
    }

    const preliminary_text = pre_text.replace('#member_type', member).replace('#member_name', member_name).replace('#action', action);
    if (!did_search || desc && did_search && !actions) {
      vote_status = `${vote_focus}`;
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
      {'hide': !represent || actions || several},
      {'animated': did_search},
      {'fadeIn': did_search}
    );

    const strikeClasses = cx(
      ['strike-out'],
      {'white': represent || actions},
      {'hide': actions}
    );

    const threeStars = cx(
      ['three-stars', 'animated', 'zoomIn'],
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
