import React from 'react';

// Component
import BaseComponent from '../BaseComponent';

// Styles
import style from './../../styles/MemberRibbon.scss';

class MemberRibbon extends BaseComponent {
  render() {
    let {name, state, party} = this.props;

    return <div className="ribbon-wrapper">
      <h1 className="ribbon">
        <strong className="ribbon-content">
    	     ({party} - {state}) {name}
        </strong>
      </h1>
    </div>;
  }
};

MemberRibbon.propTypes = {
  name: React.PropTypes.string,
  state: React.PropTypes.string,
  party: React.PropTypes.string
};

export default MemberRibbon;
