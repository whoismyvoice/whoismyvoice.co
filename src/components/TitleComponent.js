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

    let {did_search, vote_status, pre_text, number_representatives, desc, represent_gender, vote_for} = this.props;
    let final_char;

    if(!did_search || desc) {
      vote_status = `${vote_for}`;
      final_char = '?';
      pre_text = desc;
    } else if(did_search && !desc || !desc) {
      pre_text = pre_text;
      final_char = '.';
    }

    const titleClasses = cx(
      ['title-component'],
      {'uppercase': this.props.front},
      {'actions': this.props.actions}
    )

    const representClasses = cx(
      ['represent'],
      {'hide': !this.props.represent}
    )

    const starClasses = cx(
      ['star-divider'],
      {'hide': !this.props.represent || this.props.actions}
    )

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
  		  <div className="description">
          {`${pre_text} `}
          <span className="strike-out">
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
