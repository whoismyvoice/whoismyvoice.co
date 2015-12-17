import React from 'react';
import SenateStore from '../../stores/SenateStore';

// Components
import BaseComponent from '../BaseComponent';
import MemberImg from './MemberImg';
import MemberRibbon from './MemberRibbon';
import ActionButtons from './ActionButtons';

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
    let members,
      actionButton;

    if (representative && number_representatives > 2) {
      members = representative.map((result, idx) => {
        actionButton = (
          <ActionButtons
            representative={result}
          />
        );

        return (<div className="member-container" key={idx}>
          <MemberImg
            bioguide={result.bioguide_id}
            party={result.party}
            repNumber={number_representatives}
          />
          <MemberRibbon
            name={result.full_name}
            state={result.state}
            party={result.party}
          />
          {actionButton}
        </div>);
      });
    }


    return <div className="senatorWrapper">
      {members}
    </div>;
  }
}

export default CongressmanGroup;
