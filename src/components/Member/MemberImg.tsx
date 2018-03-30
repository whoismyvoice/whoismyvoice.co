import * as React from 'react';
import * as cx from 'classnames';

import { Legislator, Party } from '../../models/Legislator';

// Assets
import './../../styles/SenatorImg.css';

interface Props {
  legislator: Legislator;
  repNumber: number;
}

class SenatorImg extends React.Component<Props> {
  static defaultProps = {
    repNumber: 0,
  };

  render() {
    const { legislator, repNumber } = this.props;
    const { party } = legislator;

    const imgClasses = cx(
      ['member-img'],
      { animated: repNumber > 2 },
      { 'member--blue': party === Party.Democrat },
      { 'member--grey': party === Party.Independent }
    );

    return (
      <div className={imgClasses}>
        <img alt={legislator.fullName} src={legislator.photoUrl} />
      </div>
    );
  }
}

export default SenatorImg;