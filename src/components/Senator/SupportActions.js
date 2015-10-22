import React from 'react';

// Styles
import style from './../../styles/SupportActions.scss';

// Component
import Button from './../Button';

const SupportActions = React.createClass({
  render() {
    
    var additional = this.props.additional,
        current = this.props.currentSenator,
        random = this.props.random,
        democrats_web = 'https://my.democrats.org/page/contribute/help-elect-democrats-demsdotorg',
        republican_web = 'https://www.gop.com/rnc-victory-2016-membership-fund/';

    if(additional !== null && current === '1') {
      var gender = additional.gender === 'M' ? 'him' : 'her',
        party = additional.party === 'D' ? republican_web : democrats_web,
        email = additional.oc_email,
        twitter = additional.twitter_id,
        tel = additional.phone;

    } else {
      
      var gender = this.props.gender === 'man' ? 'him' : 'her',
          gender_third = this.props.gender === 'man' ? 'his' : 'her',
          party = this.props.party === 'D' ? republican_web : democrats_web,
          party_text = this.props.party === 'D' ? 'Repuplicans' : 'Democrats',
          email = this.props.email,
          twitter = this.props.twitter,
          tel = this.props.tel;
    }

    if(random) {

      return  <div className="supportActions rand">
        <Button 
          type='external' 
          link={ 'http://twitter.com/home/?status=@' + twitter } 
          rel='external' 
          text={ 'Tweet at ' + gender }
          secondary={'@'+twitter}
        />
        <Button
          type='external' 
          link={ party } 
          text={'Donate to ' + gender_third + ' opponent'}
          secondary={party_text}
        />
        <Button
          type='external'
          link="https://registertovote.org"
          text="Register to vote"
          secondary='registertovote.org'
        />
        </div>;

    } else {
      
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
  }
});

export default SupportActions;
