import React, { Component, } from 'react';
import PropTypes from 'prop-types';

// Components
import ContactButtonSmall from './../Buttons/ContactButtonSmall';

// Styles
import './../../styles/ActionButtons.css';

class SupportActions extends Component {
  render() {
    let gender,
      email,
      twitter,
      tel,
      twitterLink;

    const { representative, } = this.props;

    // Define each value used for every member
    if (representative) {
      gender = representative.gender === 'M' ? 'Him' : 'Her';
      email = representative.oc_email;
      twitter = representative.twitter_id;
      tel = representative.phone;
      twitterLink = `https://twitter.com/intent/tweet?hashtags=WhoIsMyVoice&text=@${twitter}`;
    }

    return  <div className="actionButtons">
      <ContactButtonSmall
        link={ 'mailto:' + email }
        icon="email"
        text={`Email ${gender}`}
        add_style="smaller"
      />
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
    </div>;
  }
}

SupportActions.propTypes = {
  representative: PropTypes.any,
};

export default SupportActions;
