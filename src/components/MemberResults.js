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
    const {representative, section} = this.props;

    let chamber;
    if (representative) {
      chamber = representative.chamber;
    }

    // Only show actionButtons on first page
    const actionButtons = section === 2 ? '' : (
      <SupportActions
        representative={representative}
      />
    );

    const nextButton = section === 2 ? '' : (
      <span>
        <div className="line-seperator line-seperator--small"></div>
        <NavButton
          text="See other representatives"
          id="0"
        />
      </span>
    );

    const titleSection = section === 2 ? (
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
    ) : (
      <span>
        <CongressmanGroup
          section={section}
          representative={representative}
        />
        <TitleComponent
          representative={representative}
          represent={true}
          section={section}
          chamber={chamber}
          classes="title-component--results"
        />
      </span>
    );

    return <span>
      {titleSection}
      {actionButtons}
      {nextButton}
    </span>;
  }
}

MemberResults.propTypes = {
  representative: React.PropTypes.array
};

export default MemberResults;
