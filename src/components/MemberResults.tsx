import * as React from 'react';

// Components
import CongressmanGroup from './Member/CongressmanGroup';
import TextButton from './Buttons/TextButton';
import { Contribution } from '../models/Contribution';
import { Chamber, Legislator } from '../models/Legislator';
import { MemberResultsTitle } from './MemberResultsTitle';
// Constants
import { ORGANIZATION_DISPLAY } from '../constants';

interface Props {
  contributions: Array<Contribution>;
  legislators: Array<Legislator>;
  section: number;
}

class MemberResults extends React.Component<Props> {
  static defaultProps = {
    legislators: [],
    contributions: [],
    section: 1,
  };

  static getNextButtonText(legislators: Array<Legislator>) {
    const houseIndex = legislators.findIndex(
      legislator => legislator.chamber === Chamber.House
    );
    if (legislators.length === 1 && houseIndex !== -1) {
      // `legislators` is only the US House Rep
      return 'My Senators';
    } else if (legislators.length === 1) {
      // `legislators` is only a US Senator
      return 'My Other Representatives';
    } else if (houseIndex === -1) {
      // `legislators` is both US Senators
      return 'My Representative';
    } else {
      // `legislators` is a US Senator and a US House Rep
      return 'My Other Senator';
    }
  }

  renderNextButton() {
    const { legislators, section } = this.props;
    let nextText = MemberResults.getNextButtonText(legislators);
    const nextButton =
      section === 2 || legislators.length === 3 ? (
        ''
      ) : (
        <span>
          <div className="line-seperator line-seperator--small" />
          <TextButton
            link={`#section-${section + 1}`}
            text={`See ${nextText}`}
          />
        </span>
      );
    return nextButton;
  }

  renderTitleSection() {
    const { legislators, contributions, section } = this.props;

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
    return (
      <span>
        <MemberResultsTitle
          className="title-component--results"
          templateString={
            paymentAmount > 0 ? yayTemplateString : nayTemplateString
          }
          templateData={templateData}
          legislators={legislators}
        />
        <CongressmanGroup
          legislators={legislators}
          contributions={contributions}
          section={section}
        />
      </span>
    );
  }

  render() {
    if (this.props.legislators.length === 0) {
      return '';
    }
    return (
      <span>
        {this.renderTitleSection()}
        {this.renderNextButton()}
      </span>
    );
  }
}

export default MemberResults;
