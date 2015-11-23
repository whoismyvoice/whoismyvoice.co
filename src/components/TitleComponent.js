import React from 'react';
import cx from 'classnames';
import SenateStore from '../stores/SenateStore';

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

    let representative,
        final_char,
        represent_gender;

    if (this.state.representatives) {
      representative = this.state.representatives[0];

      if (this.state.representatives.length === 1) {
        represent_gender = representative.gender_full === 'man' ? 'He' : 'She';
      } else if(this.state.representatives.length > 1) {
        represent_gender = 'These people';
      }
    }

    let {
      vote_status,
      pre_text,
      desc,
      vote_for,
      actions,
      classes
    } = this.props;

    const {
      did_search,
      number_representatives
    } = this.state

    if(!did_search || desc && did_search && !actions) {
      vote_status = `${vote_for}`;
      final_char = '?';
      pre_text = desc;
    } else if(did_search && !desc || !desc) {
      pre_text = pre_text;
      final_char = '.';
    } else if(actions) {
      pre_text = desc;
      final_char = '';
    }

    const titleClasses = cx(
      ['title-component', classes],
      {'uppercase': this.props.front},
      {'title-component--actions': actions}
    );

    const representClasses = cx(
      ['title-component__represent'],
      {'hide': !this.props.represent}
    );

    const starClasses = cx(
      ['title-component__star-divider'],
      {'hide': !this.props.represent || this.props.actions}
    );

    const strikeClasses = cx(
      ['strike-out'],
      {'hide': this.props.actions}
    );

    const threeStars = cx(
      ['three-stars', 'animated', 'zoomIn'],
      {'hide': this.props.represent || this.props.actions}
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
        {`${represent_gender} represents your voice!`}
      </span>
  	</div>;
  }
};

TitleComponent.propTypes = {
  desc: React.PropTypes.string,
};

export default TitleComponent;
