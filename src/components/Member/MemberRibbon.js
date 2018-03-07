import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

// Styles
import './../../styles/MemberRibbon.css';

class MemberRibbon extends Component {
  render() {
    const {name, state, party} = this.props;

    const ribbonClasses = cx(
      ['ribbon'],
      {'ribbon--grey': party === 'I'},
      {'ribbon--blue': party === 'D'}
    );

    return (
      <div className="ribbon-wrapper">
        <h1 className={ribbonClasses}>
          <strong className="ribbon-content">
      	     ({party} - {state}) {name}
          </strong>
        </h1>
      </div>
    );
  }
}

MemberRibbon.propTypes = {
  name: PropTypes.string,
  party: PropTypes.string,
  state: PropTypes.string
};

export default MemberRibbon;