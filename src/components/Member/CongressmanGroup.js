import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

// Components
import MemberImg from './MemberImg';
import MemberRibbon from './MemberRibbon';
import ActionButtons from './ActionButtons';
import PaymentCounter from '../PaymentCounter';
import { PropType as ContributionType } from '../../models/Contribution';
import { Legislator } from '../../models/Legislator';

// Styles
import './../../styles/CongressmanGroup.css';

class CongressmanGroup extends Component {
  static defaultProps = {
    legislators: [],
    contributions: [],
    section: 1,
  };

  static propTypes = {
    legislators: PropTypes.arrayOf(PropTypes.instanceOf(Legislator)),
    contributions: PropTypes.arrayOf(ContributionType),
    section: PropTypes.oneOf([1, 2, 3]),
  };

  render() {
    const {
      clicked,
      didClickOverlay,
      legislators,
      numberRepresentatives,
      contributions,
    } = this.props;
    const getAmount = Legislator.getContributionAmount.bind(
      this,
      contributions
    );
    const mobileOverlayClass = cx(['mobile-contact-overlay'], {
      show: didClickOverlay,
    });

    const members = legislators.map((legislator, idx) => {
      const payment = getAmount(legislator);
      const gender = legislator.genderPronoun;
      return (
        <div className="member-container" key={legislator.identifier}>
          <MemberImg
            bioguide={legislator.bioguide}
            legislator={legislator}
            party={legislator.party}
            repNumber={numberRepresentatives}
          />
          <MemberRibbon
            name={legislator.fullName}
            state={legislator.state}
            party={legislator.party}
          />
          <PaymentCounter payment={`${payment}`} />
          <div
            className="mobile-contact-options"
            onClick={this.toggleContactOverlay}
            id={`legislator-contact-${idx}`}
          >
            {`Contact ${gender}`}
          </div>
          <ActionButtons legislator={legislator} />
        </div>
      );
    });

    const selectedMember = clicked ? legislators[clicked] : legislators[0];

    return (
      <div className="member-wrapper">
        {members}
        <div className={mobileOverlayClass}>
          <ActionButtons legislator={selectedMember} />
          <div
            className="mobile-contact-close-button"
            onClick={this.toggleContactOverlay}
          />
        </div>
      </div>
    );
  }
}

export default CongressmanGroup;
