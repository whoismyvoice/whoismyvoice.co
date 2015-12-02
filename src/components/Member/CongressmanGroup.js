import React from 'react';
import cx from 'classnames';
import SenateStore from '../../stores/SenateStore';
import Settings from '../../data/settings.json';

// Components
import BaseComponent from '../BaseComponent';
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
    const {representatives, settings, number_representatives} = this.state;

    let wrapperClasses = 'senatorWrapper',
      {chamber} = settings ? settings : Settings;

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
          party={item.party}
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
}

CongressmanGroup.propTypes = {
  chamber: React.PropTypes.string
};

export default CongressmanGroup;
