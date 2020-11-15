import React, { VFC } from 'react';
import cx from 'classnames';

import { Legislator, Party } from '../../models/Legislator';

// Assets
import './../../styles/SenatorImg.scss';

interface Props {
  legislator: Legislator;
  repNumber?: number;
}

export const MemberImg: VFC<Props> = (props) => {
  const { legislator, repNumber = 0 } = props;
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
};

export default MemberImg;
