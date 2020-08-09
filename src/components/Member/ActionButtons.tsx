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
  renderTwitter(): JSX.Element {
    const { legislator } = this.props;
    const { genderPronoun } = legislator;
    return this.twitterLink === undefined ? (
      <React.Fragment />
    ) : (
      <ContactButtonSmall
        link={this.twitterLink}
        icon="twitter"
        text={`Tweet at ${genderPronoun}`}
      />
    );
  }

  get twitterLink(): string | undefined {
    const username = this.props.legislator.twitter;
    return username === undefined
      ? undefined
      : `https://twitter.com/intent/tweet?hashtags=WhoIsMyVoice&text=@${username}`;
  }

  render(): JSX.Element {
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
