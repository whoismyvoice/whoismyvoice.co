import React from 'react';
import { Link } from 'react-router';

// Styles
import style from './../styles/Button.scss';

const Button = React.createClass({
  render() {
    return (
      <Link to={this.props.link}>
        <button className="button">
        {this.props.text}
        </button>
      </Link>
    );
  }
});

export default Button;
