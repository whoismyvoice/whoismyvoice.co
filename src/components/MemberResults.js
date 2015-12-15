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

    if(representative && representative.length === 1) {
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
          text="See other representatives"
          id="0"
        />
      </span>;
    } else {
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
        <div className="line-seperator line-seperator--small"></div>
        <NavButton
          text="What Can I Do?"
          id="0"
        />
      </span>;
    }
  }
}

MemberResults.propTypes = {
  representative: React.PropTypes.array
};

export default MemberResults;
