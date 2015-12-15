import React from 'react';
import SenateStore from '../stores/SenateStore';

// Components
import TitleComponent from './TitleComponent';
import CongressmanGroup from './Member/CongressmanGroup';
import NavButton from './Buttons/NavButton';
import SupportActions from './member/SupportActions';
import BaseComponent from './BaseComponent';

class MemberResults extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = SenateStore.getMember();
  }

	render() {
    const {representative} = this.props;

    let chamber;
    if (representative) {
      chamber = representative.chamber;
    }

    return <span>
      <CongressmanGroup
        representative={representative}
      />
      <TitleComponent
        representative={representative}
        represent={true}
        chamber={chamber}
        classes="title-component--results"
      />
      <SupportActions
        representative={representative}
      />
      <div className="line-seperator line-seperator--small"></div>
      <NavButton
        text="Next member"
        id="0"
      />
    </span>;
  }
}

export default MemberResults;
