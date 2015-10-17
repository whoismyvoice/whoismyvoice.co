import React from 'react'
import cx from 'classnames'
import SenateGetRandomActions from '../../actions/SenateGetRandomActions'

// Styles
import style from './../../styles/Button.scss';

const RandomButton = React.createClass({

  _handleClick: function() {
    SenateGetRandomActions.getRandomMember();
  },

  render() {

    var buttonClasses = cx(
      ['button'], 
      {'hide': !this.props.random }
    );

    return  <button className={buttonClasses} onClick={this._handleClick}>
      Show Me Another
    </button>;
  }
});

export default RandomButton;
