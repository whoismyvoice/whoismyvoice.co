import * as React from 'react';

// Components
import MemberImg from './MemberImg';
import MemberRibbon from './MemberRibbon';
import ActionButtons from './ActionButtons';
import PaymentCounter from '../PaymentCounter';
import { Contribution } from '../../models/Contribution';
import { Legislator } from '../../models/Legislator';

// Styles
import './../../styles/CongressmanGroup.css';

interface Props {
  contributions: Array<Contribution>;
  legislators: Array<Legislator>;
  section: number;
}

class CongressmanGroup extends React.Component<Props> {
  static defaultProps = {
    legislators: [],
    contributions: [],
    section: 1,
  };

  render() {
    const { legislators, contributions } = this.props;
    const getAmount = Legislator.getContributionAmount.bind(
      this,
      contributions
    );
    const members = legislators.map((legislator, idx) => {
      const payment = getAmount(legislator);
      return (
        <div className="member-container" key={legislator.identifier}>
          <MemberImg legislator={legislator} repNumber={idx + 1} />
          <MemberRibbon legislator={legislator} />
          <PaymentCounter payment={`${payment}`} />
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
