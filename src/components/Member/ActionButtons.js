import React, { Component, } from 'react';
import PropTypes from 'prop-types';

// Components
import ContactButtonSmall from './../Buttons/ContactButtonSmall';
import { Legislator, } from '../../models/Legislator';

// Styles
import './../../styles/ActionButtons.css';

class SupportActions extends Component {
  static propTypes = {
    legislator: PropTypes.instanceOf(Legislator).isRequired,
  }

  render() {
    const { legislator, } = this.props;
    // Define each value used for every member
    const gender = legislator.genderPronoun;
    const twitter = legislator.twitter;
    const tel = legislator.phone;
    const twitterLink = `https://twitter.com/intent/tweet?hashtags=WhoIsMyVoice&text=@${twitter}`;
    return (
      <div className="actionButtons">
        <ContactButtonSmall
          link={`tel:${tel}`}
          icon="phone"
          text={`Call ${gender}`}
        />
        <ContactButtonSmall
          link={twitterLink}
          icon="twitter"
          text={`Tweet at ${gender}`}
        />
      </div>
    );
  }
}

export default SupportActions;
