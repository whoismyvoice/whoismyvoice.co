import React, { Component, } from 'react';
import PropTypes from 'prop-types';

// Components
import CongressmanGroup from './Member/CongressmanGroup';
import NavButton from './Buttons/NavButton';
import { PropType as ContributionType, } from '../models/Contribution';
import { Legislator, } from '../models/Legislator';
import { MemberResultsTitle } from './MemberResultsTitle';

class MemberResults extends Component {
  static defaultProps = {
    legislators: [],
    payments: [],
    section: 1,
  }

  static propTypes = {
    legislators: PropTypes.arrayOf(PropTypes.instanceOf(Legislator)),
    payments: PropTypes.arrayOf(ContributionType),
    section: PropTypes.oneOf([ 1, 2, 3, ]),
  }

  static getNextButtonText(legislators) {
    const houseIndex = legislators.findIndex(legislator => legislator.chamber === 'house');
    if (legislators.length === 1 && houseIndex !== -1) {
      // `legislators` is only the US House Rep
      return 'My Senators';
    } else if (legislators.length === 1) {
      // `legislators` is only a US Senator
      return 'My Other Representatives';
    } else if (houseIndex === -1) {
      // `legislators` is both US Senators
      return 'My Representative'
    } else {
      // `legislators` is a US Senator and a US House Rep
      return 'My Other Senator';
    }
  }

  renderNextButton() {
    const { legislators, section, } = this.props;
    let nextText = MemberResults.getNextButtonText(legislators);
    const nextButton = section === 2 || legislators.length === 3 ? '' : (
      <span>
        <div className="line-seperator line-seperator--small"></div>
        <NavButton
          text={`See ${nextText}`}
          id="0"
        />
      </span>
    );
    return nextButton;
  }

  renderTitleSection() {
    const {
      legislators,
      payments,
      section,
    } = this.props;

    const yayTemplateString = `Your <%= memberType %> <span class="bold"><b>accepted money</b></span> <span class="strike-out">from <%= organizationName %></span> in their recent election cycles.`;
    const nayTemplateString = `Your <%= memberType %> <span class="bold"><b>did not</b></span> take any money <span class="strike-out">from <%= organizationName %></span> in their recent election cycles.`
    const templateData = {
      organizationName: 'the NRA',
    };
    const getAmount = Legislator.getContributionAmount.bind(this, payments);
    const paymentAmount = legislators.reduce((amount, legislator) => (amount + getAmount(legislator)), 0);
    return (
      <span>
        <MemberResultsTitle
          className="title-component--results"
          templateString={paymentAmount > 0 ? yayTemplateString : nayTemplateString}
          templateData={templateData}
          legislators={legislators}
        />
        <CongressmanGroup
          legislators={legislators}
          payments={payments}
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
