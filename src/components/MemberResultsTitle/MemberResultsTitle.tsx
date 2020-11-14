import React, { VFC } from 'react';
import { Chamber, Legislator } from '../../models/Legislator';
import { Props as TitleProps, Title } from '../Title/Title';

import '../../styles/TitleComponent.scss';

interface Props extends TitleProps {
  legislators: Array<Legislator>;
}

type MemberType =
  | 'Representative'
  | 'Representative & Senator'
  | 'Senator'
  | 'Senator & Representative'
  | 'Senators'
  | 'Senators & Representative';

export function getMemberType(legislators: Array<Legislator>): MemberType {
  let memberType: MemberType;
  const { Senate, House } = Chamber;
  if (legislators.length === 1) {
    const [rep] = legislators;
    return rep.chamber === Senate ? 'Senator' : 'Representative';
  } else if (legislators.length === 2) {
    const chambers = legislators.map((legislator) => legislator.chamber);
    const houseIndex = chambers.findIndex((chamber) => chamber === House);
    if (houseIndex === -1) {
      memberType = 'Senators';
    } else if (houseIndex === 0) {
      memberType = 'Representative & Senator';
    } else {
      // so `houseIndex === 1`
      memberType = 'Senator & Representative';
    }
  } else if (legislators.length === 3) {
    memberType = 'Senators & Representative';
  } else if (legislators.length === 0) {
    throw new Error('Not enough legislators provided.');
  } else {
    throw new Error('Too many legislators provided.');
  }
  return memberType;
}

export const MemberResultsTitle: VFC<Props> = ({ legislators, ...props }) => {
  const memberType = getMemberType(legislators);
  return (
    <Title {...props}>
      Your{' '}
      <span className="bold">
        <b>{memberType}</b>
      </span>
    </Title>
  );
};
