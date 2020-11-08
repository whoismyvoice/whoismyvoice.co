import * as React from 'react';

// Components
import MemberImg from './MemberImg';
import MemberRibbon from './MemberRibbon';
import ActionButtons from './ActionButtons';
import { PaymentGraph } from './PaymentGraph';
import { PaymentCounter } from '../PaymentCounter';
import { SectorContributions } from '../../models/Contribution';
import { BioguideId, Legislator } from '../../models/Legislator';

// Styles
import './../../styles/CongressmanGroup.scss';

interface Props {
  allLegislators: Array<Legislator>;
  legislators: Array<Legislator>;
  sectorContributions: Record<BioguideId, SectorContributions>;
}

class CongressmanGroup extends React.Component<Props> {
  static defaultProps = {
    legislators: [],
    sectorContributions: {},
  };

  render(): JSX.Element {
    const { allLegislators, legislators, sectorContributions } = this.props;
    const maxContribution = allLegislators.reduce((max, legislator) => {
      const contributions =
        sectorContributions[legislator.bioguide]?.contributions || [];
      return Math.max(max, ...contributions.map((c) => c.amount));
    }, 0);

    const members = legislators.map((legislator, idx) => {
      const contributionToLegislator =
        sectorContributions[legislator.bioguide]?.contributions || [];
      const totalContribution = contributionToLegislator
        .map((contribution) => contribution.amount)
        .reduce((total, amount) => total + amount, 0);
      return (
        <div className="member-container" key={legislator.identifier}>
          <MemberImg legislator={legislator} repNumber={idx + 1} />
          <MemberRibbon legislator={legislator} />
          <PaymentCounter payment={totalContribution} />
          <PaymentGraph
            width={300}
            height={300}
            contributions={contributionToLegislator}
            maxContribution={maxContribution}
            legislatorParty={legislator.party}
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
