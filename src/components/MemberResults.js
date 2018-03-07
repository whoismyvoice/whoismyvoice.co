import React, { Component, } from 'react';
import PropTypes from 'prop-types';

// Components
import TitleComponent from './TitleComponent';
import CongressmanGroup from './Member/CongressmanGroup';
import NavButton from './Buttons/NavButton';

class MemberResults extends Component {
  render() {
    const {
      representative,
      section,
    } = this.props;

    let chamber,
      nextText;

    if (representative) {
      chamber = representative.chamber;
    }

    if (representative) {
      if (section === 1 && representative[0].chamber === 'house') {
        nextText = 'My Senators';
      } else if (section === 1 && representative[0].chamber === 'senate') {
        nextText = 'My Other Representative';
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
  representative: PropTypes.arrayOf(PropTypes.shape({
  })),
};

export default MemberResults;
