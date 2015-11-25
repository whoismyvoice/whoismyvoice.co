import React from 'react';
import cx from 'classnames';
import SenateStore from '../stores/SenateStore';
import Settings from '../data/settings.json';

// Component
import BaseComponent from './BaseComponent';

// Styles
import style from './../styles/TitleComponent.scss';

class TitleComponent extends BaseComponent {
  constructor() {
    super();
    this.state = SenateStore.getMember();
  }
  render() {
    const {
      desc,
      actions,
      classes,
      front,
      represent
    } = this.props;

    const {
      did_search,
      number_representatives,
      settings
    } = this.state

    let representative,
        final_char,
        represent_gender,
        member_name = '',
        vote_status = '',
        impact,
        {chamber, bill_desc, voted_for, voted_against, impact_text, pre_text} = settings ? settings : Settings,
        action_text = impact_text.replace('#gender_third', 'this person'),
        member = chamber === 'senate' ? 'Senator': 'Congressman',
        member_single = chamber === 'senate' ? 'Senator': 'Congressman',
        action = chamber === 'senate' ? 'co-sponsored the bill to' : 'voted to',
        represent_text = 'represents';

    if (this.state.representatives) {
      representative = this.state.representatives[0];
      vote_status = representative.voted === 'Yea' ? `${voted_for}` : `${voted_against}`;

      if (this.state.representatives.length === 1) {
        impact = impact_text.replace('#gender_third', `this ${representative.gender_full}`);
        represent_gender = representative.gender_full === 'man' ? 'He' : 'She';
        member_name = representative.full_name;
      } else if(this.state.representatives.length > 1) {
        represent_gender = 'These people';
        represent_text = 'represent';
        member = chamber === 'senate' ? 'Senators' : 'Representatives';
      }
    }

    const preliminary_text = pre_text.replace('#member_type', member).replace('#member_name', member_name).replace('#action', action);

    if(!did_search || desc && did_search && !actions) {
      vote_status = `${voted_for}`;
      final_char = '?';
      pre_text = bill_desc.replace('#member', member_single);
    } else if(did_search && !desc || !desc) {
      pre_text = preliminary_text;
      final_char = '.';
    } else if(actions) {
      pre_text = action_text;
      final_char = '';
    }

    const titleClasses = cx(
      ['title-component', classes],
      {'uppercase': front}
    );

    const representClasses = cx(
      ['title-component__represent'],
      {'hide': !represent}
    );

    const starClasses = cx(
      ['title-component__star-divider'],
      {'hide': !represent || actions}
    );

    const strikeClasses = cx(
      ['strike-out'],
      {'hide': actions}
    );

    const threeStars = cx(
      ['three-stars', 'animated', 'zoomIn'],
      {'hide': represent || actions}
    )

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
};

TitleComponent.propTypes = {
  desc: React.PropTypes.bool,
  actions: React.PropTypes.bool,
  classes: React.PropTypes.string,
  front: React.PropTypes.bool,
  represent: React.PropTypes.bool
};

export default TitleComponent;