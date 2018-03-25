import * as React from 'react';
import * as cx from 'classnames';
import { Legislator } from '../../models/Legislator';

// Styles
import './../../styles/MemberRibbon.css';

interface Props {
  legislator: Legislator;
}

class MemberRibbon extends React.Component<Props> {
  render() {
    const { legislator } = this.props;
    const { fullName, party, state } = legislator;

    const ribbonClasses = cx(
      ['ribbon'],
      { 'ribbon--grey': party === 'I' },
      { 'ribbon--blue': party === 'D' }
    );

    return (
      <div className="ribbon-wrapper">
        <h1 className={ribbonClasses}>
          <strong className="ribbon-content">
            ({party} - {state}) {fullName}
          </strong>
        </h1>
      </div>
    );
  }
}

export default MemberRibbon;
