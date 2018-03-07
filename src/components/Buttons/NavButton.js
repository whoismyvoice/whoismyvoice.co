import React, { Component, } from 'react';
import PropTypes from 'prop-types';

// Styles
import '../../styles/TextButton.css';

class NavButton extends Component {
  render() {
    const { id, text, } = this.props;
    return <a className="text-button" id={id}>
      <span id={id}>{text}</span>
      <div id={id} className="text-button-border">
      </div>
  	</a>;
  }
}

NavButton.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string
};

export default NavButton;
