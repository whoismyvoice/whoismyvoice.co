import React from 'react';

// Styles
import style from './../styles/SupportActions.scss';

// Components
import Button from './Button';

const SupportActions = React.createClass({
  render() {
  	var gender = this.props.gender === 'man' ? 'him' : 'her',
  			email = this.props.email,
  			twitter = this.props.twitter,
  			tel = this.props.tel;

    return (
    	<div className="supportActions">
    		<Button type='external' link={'mailto:' + email} text={'Email at ' + gender} />
        <Button type='external' link={'tel:' + tel} text={'Call at ' + gender} />
        <Button type='external' link={'http://twitter.com/' + twitter} rel='external' text={'Tweet at ' + gender} />
        <Button type='external' link="https://vote.usa.gov/" text="Register to vote" />
    	</div>
    );
  }
});

export default SupportActions;
