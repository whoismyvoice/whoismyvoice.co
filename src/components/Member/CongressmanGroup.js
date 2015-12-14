import React from 'react';
import SenateStore from '../../stores/SenateStore';

// Components
import BaseComponent from '../BaseComponent';
import MemberImg from './MemberImg';
import MemberRibbon from './MemberRibbon';

// Styles
import style from './../../styles/CongressmanGroup.scss';

class CongressmanGroup extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = SenateStore.getMember();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.did_search && nextState.number_representatives > 2) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const {representative} = this.props;
    const {number_representatives} = this.state;

    return <div className="senatorWrapper">
      <div className="member-container">
        <MemberImg
          bioguide={representative.bioguide_id}
          party={representative.party}
          repNumber={number_representatives}
        />
        <MemberRibbon
          name={representative.full_name}
          state={representative.state}
          party={representative.party}
        />
      </div>
    </div>;
  }
}

CongressmanGroup.propTypes = {
  chamber: React.PropTypes.string
};

export default CongressmanGroup;
