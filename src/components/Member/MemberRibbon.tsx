import React from 'react';
import cx from 'classnames';
import { Legislator, Party } from '../../models/Legislator';

// Styles
import './../../styles/MemberRibbon.scss';

interface Props {
  legislator: Legislator;
}

class MemberRibbon extends React.Component<Props> {
  render(): JSX.Element {
    const { legislator } = this.props;
    const { fullName, party, state } = legislator;

    const ribbonClasses = cx(
      ['ribbon'],
      { 'ribbon--grey': party === Party.Independent },
      { 'ribbon--blue': party === Party.Democrat }
    );

    return (
      <div className="ribbon-wrapper">
        <h1 className={ribbonClasses}>
          <strong className="ribbon-content">
            ({party.charAt(0)} - {state}) {fullName}
          </strong>
        </h1>
      </div>
    );
  }
}

export default MemberRibbon;
