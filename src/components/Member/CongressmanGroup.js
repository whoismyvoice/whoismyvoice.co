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
    if (nextState.did_search && nextState.number_representatives === 3 && nextState.number_house === 1) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const {representative} = this.props;
    const {number_representatives} = this.state;

    let bioguide_id,
      party,
      full_name,
      state;

    if (representative && number_representatives > 0) {
      bioguide_id = representative.bioguide_id;
      party = representative.party;
      full_name = representative.full_name;
      state = representative.state;
    }

    return <div className="senatorWrapper">
      <div className="member-container">
        <MemberImg
          bioguide={bioguide_id}
          party={party}
          repNumber={number_representatives}
        />
        <MemberRibbon
          name={full_name}
          state={state}
          party={party}
        />
      </div>
    </div>;
  }
}

CongressmanGroup.propTypes = {
  chamber: React.PropTypes.string
};

export default CongressmanGroup;
