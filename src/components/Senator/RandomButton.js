import React from 'react'
import cx from 'classnames'
import SenateGetRandomActions from '../../actions/SenateGetRandomActions'

// Styles
import style from './../../styles/Button.scss';

const RandomButton = React.createClass({
  render() {

    var buttonClasses = cx(
      ['button'], 
      {'hide': !this.props.random }
    );

    return (
      <button className={buttonClasses} onClick={this._onClick}>
        Show Me Another
      </button>
    );
  },

  _onClick: function() {
    SenateGetRandomActions.getRandomMember();
  }
});

export default RandomButton;
