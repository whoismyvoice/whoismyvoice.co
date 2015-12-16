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

    let chamber;
    if (representative) {
      chamber = representative.chamber;
    }

    const nextButton = section === 2 ? '' : (
      <span>
        <div className="line-seperator line-seperator--small"></div>
        <NavButton
          text="See other representatives"
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
