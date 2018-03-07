import React, { Component, } from 'react';
import cx from 'classnames';

// Components
import MemberImg from './MemberImg';
import MemberRibbon from './MemberRibbon';
import ActionButtons from './ActionButtons';
import PaymentCounter from '../PaymentCounter';

// Styles
import './../../styles/CongressmanGroup.css';

class CongressmanGroup extends Component {
  render() {
    const {
      clicked,
      didClickOverlay,
      numberRepresentatives,
      representative,
    } = this.props;

    let members,
      actionButton;

    const mobileOverlayClass = cx(
      [
        'mobile-contact-overlay',
      ],
      {
        'show': didClickOverlay,
      },
    );

    if (representative && numberRepresentatives > 2) {
      members = representative.map((result, idx) => {
        actionButton = (
          <ActionButtons
            representative={result}
          />
        );

        const payment = result.payment.toString();

        const gender = result.gender === 'M' ? 'Him' : 'Her';

        return (
          <div className="member-container" key={idx}>
            <MemberImg
              bioguide={result.bioguide_id}
              party={result.party}
              repNumber={numberRepresentatives}
            />
            <MemberRibbon
              name={result.full_name}
              state={result.state}
              party={result.party}
            />
            <PaymentCounter
              payment={payment}
            />
            <div
              className="mobile-contact-options"
              onClick={this.toggleContactOverlay}
              id={idx}
            >
              {`Contact ${gender}`}
            </div>
            {actionButton}
          </div>
        );
      });
    }

    const selectedMember = clicked ? representative[clicked] : representative;

    return (
      <div className="member-wrapper">
        {members}
        <div className={mobileOverlayClass}>
          <ActionButtons
            representative={selectedMember}
          />
          <div className="mobile-contact-close-button" onClick={this.toggleContactOverlay} />
        </div>
      </div>
    );
  }
}

export default CongressmanGroup;