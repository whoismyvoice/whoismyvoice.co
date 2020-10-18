import React from 'react';

// Components
import CongressmanGroup from '../Member/CongressmanGroup';
import { SectorContributions } from '../../models/Contribution';
import { Legislator } from '../../models/Legislator';
import { MemberResultsTitle } from '../MemberResultsTitle';
// Constants
import { ORGANIZATION_DISPLAY } from '../../constants';

export interface DispatchProps {
  onNext?: (event: React.MouseEvent<HTMLElement>) => void;
}

export interface Props extends DispatchProps {
  legislators: Array<Legislator>;
  section: number;
  sectors: string[];
  sectorContributions: SectorContributions[];
}

class MemberResults extends React.Component<Props> {
  static defaultProps: Partial<Props> = {
    legislators: [],
    onNext: () => undefined,
    section: 1,
    sectorContributions: [],
  };

  render(): JSX.Element {
    if (this.props.legislators.length === 0) {
      return <React.Fragment />;
    }

    const { legislators, sectorContributions } = this.props;

    const templateString = `Your <%= memberType %> received money from <span class="bold"><b><%= sectorCount %></b></span> different industries.`;
    const templateData = {
      organizationName: ORGANIZATION_DISPLAY,
      sectorCount: this.props.sectors.length,
    };
    const groupOne = legislators.slice(0, 2);
    const groupTwo = legislators.slice(2);
    return (
      <React.Fragment>
        <MemberResultsTitle
          className="title-component--results"
          templateString={templateString}
          templateData={templateData}
          legislators={legislators}
        />
        <CongressmanGroup
          legislators={groupOne}
          sectorContributions={sectorContributions}
        />
        <CongressmanGroup
          legislators={groupTwo}
          sectorContributions={sectorContributions}
        />
      </React.Fragment>
    );
  }
}

export default MemberResults;
