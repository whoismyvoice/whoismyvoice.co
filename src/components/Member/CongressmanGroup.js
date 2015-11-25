import React from 'react';
import cx from 'classnames';
import SenateStore from '../../stores/SenateStore';
import Settings from '../../data/settings.json';

// Components
import BaseComponent from '../BaseComponent';
import SearchAddress from '../SearchAddress';
import MemberImg from './MemberImg';
import MemberRibbon from './MemberRibbon';

// Styles
import style from './../../styles/CongressmanGroup.scss';

class CongressmanGroup extends BaseComponent {
  constructor() {
    super();
    this.state = SenateStore.getMember();
  }
  render() {
    let wrapperClasses = 'senatorWrapper',
          {chamber} = settings ? settings : Settings;

    const {representatives, zip_code, state_full, settings, number_representatives} = this.state;

    if (representatives) {
      wrapperClasses = cx(
        ['member-wrapper'],
        {'several': representatives.length > 1}
      );
    }

    const members = (representatives || []).map(function(item, idx) {
      return <div className="member-container" key={idx}>
        <MemberImg
          bioguide={item.bioguide_id}
          chamber={chamber}
          repNumber={number_representatives}
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
  chamber: React.PropTypes.string
};

export default CongressmanGroup;