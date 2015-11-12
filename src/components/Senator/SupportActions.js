import React from 'react';

// Styles
import style from './../../styles/SupportActions.scss';

// Component
import Button from './../Button';

class SupportActions extends React.Component {
  render() {
    let representative,
      gender,
      email,
      twitter,
      tel,
      current = this.props.currentSenator || 0;

    if (this.props.representatives !== null) {
      representative = this.props.representatives[current];
      gender = representative.gender === 'M' ? 'him' : 'her';
      email = representative.oc_email;
      twitter = representative.twitter_id;
      tel = representative.phone;
    }

    return  <div className="supportActions">
      <Button
        color="purple-text"
        type="external"
        link={ 'mailto:' + email }
        text={ 'Email ' + gender }
        secondary={email}
      />
      <Button
        color="purple-text"
        type="external"
        link={ 'tel:' + tel }
        text={ 'Call ' + gender}
        secondary={tel}
      />
      <Button
        color="purple-text"
        type="external"
        link={'http://twitter.com/home/?status=@' + twitter}
        rel="external"
        text={ 'Tweet at ' + gender }
        secondary={'@' + twitter}
      />
      <Button
        color="purple-text"
        type="external"
        link="https://registertovote.org/"
        text="Register to vote"
        secondary="registertovote.org"
      />
    </div>;
  }
};

SupportActions.propTypes = {
  currentSenator: React.PropTypes.any,
  representatives: React.PropTypes.array
};

export default SupportActions;
