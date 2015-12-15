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
      gender = representative[0].gender === 'M' ? 'Him' : 'Her';
      gender_alt = representative[0].gender === 'M' ? 'His' : 'Her';
      email = representative[0].oc_email;
      twitter = representative[0].twitter_id;
      tel = representative[0].phone;
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
