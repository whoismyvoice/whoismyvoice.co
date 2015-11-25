import React from 'react';
import cx from 'classnames';

// Component
import BaseComponent from './BaseComponent';

// Styles
import style from './../styles/errorMsg.scss';

class ErrorMsg extends React.Component {
  render() {
    const isError = this.props.error;
    const errorClasses = cx(
      ['errorMsg'],
      {'show': !isError}
    );
    // Check if bioguide is defined (i.e. if user has searched for any members yet)

    return <div className={errorClasses}>
      {this.props.error}
    </div>;
  }
}

ErrorMsg.propTypes = {
  error: React.PropTypes.string
};

export default ErrorMsg;
