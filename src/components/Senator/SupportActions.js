import React from 'react';

// Styles
import style from './../../styles/SupportActions.scss';

// Components
import Button from './../Button';

const SupportActions = React.createClass({
  render() {
    
  	var gender = this.props.gender === 'man' ? 'him' : 'her',
        gender_third = this.props.gender === 'man' ? 'his' : 'her',
        party = this.props.party === 'D' ? 'https://www.gop.com/rnc-victory-2016-membership-fund/' : 'https://my.democrats.org/page/contribute/help-elect-democrats-demsdotorg',
        party_text = this.props.party === 'D' ? 'Repuplicans' : 'Democrats',
  			email = this.props.email,
  			twitter = this.props.twitter,
  			tel = this.props.tel,
        random = this.props.random;

    if(random) {

      return  <div className="supportActions">
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
