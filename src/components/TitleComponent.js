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

    let {did_search, vote_status, pre_text, number_representatives, desc} = this.props;

    if(!did_search || desc) {
      vote_status = '';
      pre_text = desc;
    } else if(did_search && !desc || !desc) {
      pre_text = pre_text;
    }

    const titleClasses = cx(
      ['title-component'],
      {'uppercase': this.props.front})

    return <div className={titleClasses}>
  		  <div className="description">
          {pre_text}
          <span className="strike-out">
          {vote_status}
          </span>
  		  </div>
  	</div>;
  }
};

TitleComponent.propTypes = {
  desc: React.PropTypes.string,
  numRep: React.PropTypes.number,
  representatives: React.PropTypes.array,
};

export default TitleComponent;
