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
}

class MemberResults extends React.Component<Props> {
  static defaultProps: Props = {
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

    const yayTemplateString = `Your <%= memberType %> <span class="bold"><b>accepted money</b></span> <span class="strike-out">from <%= organizationName %></span> in their recent election cycles.`;
    const nayTemplateString = `Your <%= memberType %> <span class="bold"><b>did not</b></span> take any money <span class="strike-out">from <%= organizationName %></span> in their recent election cycles.`;
    const templateData = {
      organizationName: ORGANIZATION_DISPLAY,
    };
    const getAmount = Legislator.getContributionAmount.bind(
      this,
      contributions
    );
    const paymentAmount = legislators.reduce(
      (amount, legislator) => amount + getAmount(legislator),
      0
    );
    const groupOne = legislators.slice(0, 2);
    const groupTwo = legislators.slice(2);
    return (
      <React.Fragment>
        <MemberResultsTitle
          className="title-component--results"
          templateString={
            paymentAmount > 0 ? yayTemplateString : nayTemplateString
          }
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
