import React from 'react';
import SenateStore from '../stores/SenateStore';

// Components
import TitleComponent from './TitleComponent';
import CongressmanGroup from './Member/CongressmanGroup';
import NavButton from './Buttons/NavButton';
import BaseComponent from './BaseComponent';

class MemberResults extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = SenateStore.getMember();
  }

	render() {
    const {representative} = this.props;
    return <span>
      <CongressmanGroup
        representative={representative}
      />
      <TitleComponent
        represent={true}
        classes="title-component--results"
      />
      <div className="line-seperator line-seperator--small"></div>
      <NavButton
        text="What can I do?"
        id="0"
      />
    </span>;
  }
}

export default MemberResults;
