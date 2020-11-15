import React, { VFC } from 'react';

// Components
import CongressmanGroup from '../Member/CongressmanGroup';
import { SectorContributions } from '../../models/Contribution';
import { BioguideId, Legislator } from '../../models/Legislator';
import { MemberResultsTitle } from '../MemberResultsTitle';

export interface Props {
  allLegislators?: Array<Legislator>;
  legislators?: Array<Legislator>;
  sectorContributions?: Record<BioguideId, SectorContributions>;
}

export const MemberResults: VFC<Props> = (props) => {
  const {
    allLegislators = [],
    legislators = [],
    sectorContributions = {},
  } = props;
  if (legislators.length === 0) {
    return <React.Fragment />;
  }

  const groupOne = legislators.slice(0, 2);
  const groupTwo = legislators.slice(2);
  return (
    <React.Fragment>
      <MemberResultsTitle
        className="title-component--results"
        legislators={legislators}
      />
      <CongressmanGroup
        allLegislators={allLegislators}
        legislators={groupOne}
        sectorContributions={sectorContributions}
      />
      <CongressmanGroup
        allLegislators={allLegislators}
        legislators={groupTwo}
        sectorContributions={sectorContributions}
      />
    </React.Fragment>
  );
};

export default MemberResults;
