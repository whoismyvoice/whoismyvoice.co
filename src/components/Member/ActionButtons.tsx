import * as React from 'react';

// Components
import ContactButtonSmall from './../Buttons/ContactButtonSmall';
import { Legislator } from '../../models/Legislator';

// Styles
import './../../styles/ActionButtons.scss';

interface Props {
  legislator: Legislator;
}

class SupportActions extends React.Component<Props> {
  renderTwitter() {
    const { legislator } = this.props;
    const { genderPronoun, twitter } = legislator;
    const twitterLink = `https://twitter.com/intent/tweet?hashtags=WhoIsMyVoice&text=@${twitter}`;
    return twitter === undefined ? null : (
      <ContactButtonSmall
        link={twitterLink}
        icon="twitter"
        text={`Tweet at ${genderPronoun}`}
      />
    );
  }

  render() {
    const { legislator } = this.props;
    // Define each value used for every member
    const { genderPronoun, phone } = legislator;
    return (
      <div className="actionButtons">
        <ContactButtonSmall
          link={`tel:${phone}`}
          icon="phone"
          text={`Call ${genderPronoun}`}
        />
        {this.renderTwitter()}
      </div>
    );
  }
}

export default SupportActions;
