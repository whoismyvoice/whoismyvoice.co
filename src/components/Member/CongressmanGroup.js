import React from 'react';
import SenateStore from '../../stores/SenateStore';

// Components
import BaseComponent from '../BaseComponent';
import MemberImg from './MemberImg';
import MemberRibbon from './MemberRibbon';
import NavButton from '../Buttons/NavButton';

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
    const {representative, section} = this.props;
    const {number_representatives} = this.state;
    let members;

    const nextButton = section === 1 ? '' : (
      <span>
        <div className="line-seperator line-seperator--small"></div>
        <NavButton
          text="What Can I Do?"
          id="0"
        />
      </span>
    );

    if (representative && number_representatives > 2) {
      members = representative.map((result, idx) => {
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
        {nextButton}
        </div>);
      });
    }


    return <div className="senatorWrapper">
      {members}
    </div>;
  }
}

export default CongressmanGroup;
