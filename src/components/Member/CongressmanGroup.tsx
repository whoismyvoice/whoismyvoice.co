import * as React from 'react';

// Components
import MemberImg from './MemberImg';
import MemberRibbon from './MemberRibbon';
import ActionButtons from './ActionButtons';
import PaymentCounter from '../PaymentCounter';
import { Contribution, SectorContributions } from '../../models/Contribution';
import { Legislator } from '../../models/Legislator';

// Styles
import './../../styles/CongressmanGroup.scss';

interface Props {
  contributions: Array<Contribution>;
  legislators: Array<Legislator>;
  sectorContributions: SectorContributions[];
}

class CongressmanGroup extends React.Component<Props> {
  static defaultProps = {
    legislators: [],
    contributions: [],
    sectorContributions: [],
  };

  render(): JSX.Element {
    const { legislators, sectorContributions } = this.props;
    const members = legislators.map((legislator, idx) => {
      const contributionToLegislator = sectorContributions.filter(
        (group) => group.legislatorId === legislator.bioguide
      );
      const numContributors = contributionToLegislator
        .map((group) => group.contributions.length)
        .reduce((total, length) => total + length, 0);
      const totalContribution = contributionToLegislator
        .flatMap((group) =>
          group.contributions.map((contributeion) => contributeion.amount)
        )
        .reduce((total, amount) => total + amount, 0);
      return (
        <div className="member-container" key={legislator.identifier}>
          <MemberImg legislator={legislator} repNumber={idx + 1} />
          <MemberRibbon legislator={legislator} />
          <PaymentCounter
            numContributors={numContributors}
            payment={`${totalContribution}`}
          />
          <div
            className="mobile-contact-options"
            id={`legislator-contact-${idx}`}
          >
            {`Contact ${legislator.genderPronoun}`}
          </div>
          <ActionButtons legislator={legislator} />
        </div>
      );
    });

    return <div className="member-wrapper">{members}</div>;
  }
}

export default CongressmanGroup;
