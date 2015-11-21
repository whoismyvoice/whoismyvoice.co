import React from 'react';
import cx from 'classnames';

// Components
import BaseComponent from '../BaseComponent';
import SearchAddress from '../SearchAddress';
import SenatorImg from './SenatorImg';
import MemberRibbon from './MemberRibbon';
import ArrowDown from '../ArrowDown';

// Styles
import style from './../../styles/CongressmanGroup.scss';

class CongressmanGroup extends BaseComponent {
  render() {
    let searchClasses = 'search',
        wrapperClasses = 'senatorWrapper';

    const {representatives, zip_code, state_full, chamber, numRep} = this.props;

    if (representatives) {
      wrapperClasses = cx(
        ['senatorWrapper'],
        {'several': representatives.length > 1}
      );
    }

    const members = (representatives || []).map(function(item, idx) {
      return <div className="member-container" key={idx}>
        <SenatorImg
          bioguide={item.bioguide_id}
          chamber={chamber}
          repNumber={numRep}
        />

        <MemberRibbon
          name={item.full_name}
          state={item.state}
          party={item.party}
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
