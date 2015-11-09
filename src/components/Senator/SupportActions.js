import React from 'react';

// Styles
import style from './../../styles/SupportActions.scss';

// Component
import Button from './../Button';

const SupportActions = React.createClass({
  propTypes: {
    currentSenator: React.PropTypes.number,
    representatives: React.PropTypes.array
  },
  render() {
    let representative,
      gender,
      email,
      twitter,
      tel;

    const current = this.props.currentSenator || 0,
          representatives = this.props.representatives;

    if (representatives !== null) {
      representative = representatives[current];
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
});

export default SupportActions;
