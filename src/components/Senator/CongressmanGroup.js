import React from 'react';
import Settings from '../../data/settings.json';
import cx from 'classnames';

// Components
import BaseComponent from '../BaseComponent';
import SearchAddress from '../SearchAddress';
import SenatorImg from './SenatorImg';
import SenatorName from './SenatorName';
import ArrowDown from '../ArrowDown';

// Styles
import style from './../../styles/CongressmanGroup.scss';

class CongressmanGroup extends BaseComponent {
  render() {
    let searchClasses = 'search',
        wrapperClasses = 'senatorWrapper';

    const {representatives, zip_code, state_full} = this.props,
          {chamber} = Settings;

    if (representatives) {
      wrapperClasses = cx(
        ['senatorWrapper'],
        {'several': representatives.length > 1}
      );
    }

    const members = (representatives || []).map(function(item, idx) {
      return <div className="senatorContainer" key={idx}>
        <SenatorImg
          bioguide={item.bioguide_id}
        />

        <SenatorName
          name={item.full_name}
          age={item.age}
          state={item.state}
          voted={item.voted}
        />

        <ArrowDown
          id={idx}
          additional={item.additional}
          double={"true"}
          color="orange-text"
        />
      </div>;
    });
    return <div className={wrapperClasses}>
      {members}
    </div>;
  }
};

CongressmanGroup.propTypes = {
  representatives: React.PropTypes.array,
  zip_code: React.PropTypes.string
};

export default CongressmanGroup;
