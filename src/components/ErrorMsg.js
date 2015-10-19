import React from 'react';
import cx from 'classnames';

// Styles
import style from './../styles/errorMsg.scss';

const ErrorMsg = React.createClass({
  render() {

    var isError = this.props.error === '';

    var errorClasses = cx(
      ['errorMsg'], 
      {'show': !isError }
    );

  	// Check if bioguide is defined (i.e. if user has searched for any members yet)
  	return <div className={errorClasses}>
      {this.props.error}
    </div>;
  }
});

export default ErrorMsg;