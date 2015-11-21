import React from 'react';
import cx from 'classnames';

// Component
import BaseComponent from './BaseComponent';

// Styles
import style from './../styles/TitleComponent.scss';

class TitleComponent extends BaseComponent {
  render() {
    if(this.props.representatives) {
      representative = this.props.representatives[0];
    }

    let {
      did_search,
      vote_status,
      pre_text,
      number_representatives,
      desc,
      represent_gender,
      vote_for,
      actions,
      classes
    } = this.props;

    let final_char;

    if(!did_search || desc && did_search && !actions) {
      vote_status = `${vote_for}`;
      final_char = '?';
      pre_text = desc;
    } else if(did_search && !desc || !desc) {
      pre_text = pre_text;
      final_char = '.';
    } else if(actions) {
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
  numRep: React.PropTypes.number,
  representatives: React.PropTypes.array,
};

export default TitleComponent;
