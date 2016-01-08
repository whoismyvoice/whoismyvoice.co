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
    const {representative, section} = this.props;
    let chamber,
      nextText;
    if (representative) {
      chamber = representative.chamber;
    }

    if (representative) {
      if (section === 1 && representative[0].chamber === 'house') {
        nextText = 'My Senators';
      } else if (section === 1 && representative[0].chamber === 'senate') {
        nextText = 'My Other Representatives';
      }
    }

    const nextButton = section === 2 ? '' : (
      <span>
        <div className="line-seperator line-seperator--small"></div>
        <NavButton
          text={`See ${nextText}`}
          id="0"
        />
      </span>
    );

    const titleSection = (
      <span>
        <TitleComponent
          representative={representative}
          represent={true}
          chamber={chamber}
          section={section}
          classes="title-component--results"
        />
        <CongressmanGroup
          section={section}
          representative={representative}
        />
      </span>
    );

    return <span>
      {titleSection}
      {nextButton}
    </span>;
  }
}

MemberResults.propTypes = {
  representative: React.PropTypes.array
};

export default MemberResults;
