import React from 'react'

// Styles
import style from './../../styles/SupportActions.scss';

// Component
import Button from './../Button';

const SupportActions = React.createClass({
  render() {
    
    var additional = this.props.additional,
        current = this.props.currentSenator,
        gender,
        email,
        twitter,
        tel;

    if(additional !== null && current === '1') {
      gender = additional.gender === 'M' ? 'him' : 'her',
      email = additional.oc_email,
      twitter = additional.twitter_id,
      tel = additional.phone;

    } else {
      gender = this.props.gender === 'man' ? 'him' : 'her',
      email = this.props.email,
      twitter = this.props.twitter,
      tel = this.props.tel;
    }

    return  <div className="supportActions">
      <Button 
        type='external' 
        link={ 'mailto:' + email } 
        text={ 'Email ' + gender }
        secondary={email}
      />
      <Button
        type='external'
        link={ 'tel:' + tel }
        text={ 'Call ' + gender}
        secondary={tel}
      />
      <Button
        type='external'
        link={ 'http://twitter.com/home/?status=@' + twitter }
        rel='external' 
        text={ 'Tweet at ' + gender }
        secondary={'@'+twitter}
      />
      <Button
        type='external'
        link="https://registertovote.org/"
        text="Register to vote"
        secondary='registertovote.org'
      />
    </div>;
  }
});

export default SupportActions;
