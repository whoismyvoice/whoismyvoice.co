import React from 'react';

// Components
import CongressmanGroup from '../Member/CongressmanGroup';
import { Contribution } from '../../models/Contribution';
import { Legislator } from '../../models/Legislator';
import { MemberResultsTitle } from '../MemberResultsTitle';
// Constants
import { ORGANIZATION_DISPLAY } from '../../constants';

export interface DispatchProps {
  onNext?: (event: React.MouseEvent<HTMLElement>) => void;
}

export interface Props extends DispatchProps {
  contributions: Array<Contribution>;
  legislators: Array<Legislator>;
  section: number;
  sectors: string[];
}

class MemberResults extends React.Component<Props> {
  static defaultProps: Partial<Props> = {
    contributions: [],
    legislators: [],
    onNext: () => undefined,
    section: 1,
  };

  render(): JSX.Element {
    if (this.props.legislators.length === 0) {
      return <React.Fragment />;
    }

    const { legislators, contributions } = this.props;

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
          contributions={contributions}
        />
        <CongressmanGroup
          legislators={groupTwo}
          contributions={contributions}
        />
      </React.Fragment>
    );
  }
}

export default MemberResults;
