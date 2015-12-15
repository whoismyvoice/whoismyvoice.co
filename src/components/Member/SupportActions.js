import React from 'react';
import SenateStore from '../../stores/SenateStore';

// Components
import BaseComponent from '../BaseComponent';
import ContactButton from './../Buttons/ContactButton';

// Styles
import style from './../../styles/SupportActions.scss';

class SupportActions extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = SenateStore.getMember();
  }

  render() {
    let gender,
      email,
      twitter,
      tel,
      gender_alt,
      twitterLink;

    const {representative} = this.props;

    // Define each value used for every member
    if (representative) {
      gender = representative.gender === 'M' ? 'Him' : 'Her';
      gender_alt = representative.gender === 'M' ? 'His' : 'Her';
      email = representative.oc_email;
      twitter = representative.twitter_id;
      tel = representative.phone;
      twitterLink = 'http://twitter.com/${twitter}';
    }

    return  <div className="contactActions">
      <ContactButton
        text={`Email ${gender}`}
        link={ 'mailto:' + email }
        detail={email}
        icon="email"
      />
      <ContactButton
        text={`Call ${gender_alt} Office`}
        link={`tel:${tel}`}
        detail={tel}
        icon="phone"
      />
      <ContactButton
        text={`Tweet at ${gender}`}
        link={twitterLink}
        detail={`@${twitter}`}
        icon="twitter"
      />
      <ContactButton
        text="Register to Vote"
        link="https://registertovote.org/"
        detail="registertovote.org"
        icon="vote"
      />
    </div>;
  }
}

SupportActions.propTypes = {
  representative: React.PropTypes.any
};

export default SupportActions;
