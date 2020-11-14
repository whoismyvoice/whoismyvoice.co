import React from 'react';

// Components
import CongressmanGroup from '../Member/CongressmanGroup';
import { SectorContributions } from '../../models/Contribution';
import { BioguideId, Legislator } from '../../models/Legislator';
import { MemberResultsTitle } from '../MemberResultsTitle';

export interface Props {
  allLegislators: Array<Legislator>;
  legislators: Array<Legislator>;
  sectors: string[];
  sectorContributions: Record<BioguideId, SectorContributions>;
}

class MemberResults extends React.Component<Props> {
  static defaultProps: Partial<Props> = {
    allLegislators: [],
    legislators: [],
    sectorContributions: {},
  };

  render(): JSX.Element {
    if (this.props.legislators.length === 0) {
      return <React.Fragment />;
    }

    const { allLegislators, legislators, sectorContributions } = this.props;

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
  }
}

export default MemberResults;
