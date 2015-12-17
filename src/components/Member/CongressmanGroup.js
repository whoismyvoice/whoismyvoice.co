import React from 'react';
import SenateStore from '../../stores/SenateStore';
import cx from 'classnames';

// Components
import BaseComponent from '../BaseComponent';
import MemberImg from './MemberImg';
import MemberRibbon from './MemberRibbon';
import ActionButtons from './ActionButtons';

// Styles
import style from './../../styles/CongressmanGroup.scss';

class CongressmanGroup extends BaseComponent {
  constructor(props) {
    super(props);
    this.state = SenateStore.getMember();
    this._bind('toggleContactOverlay');
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.did_search && nextState.number_representatives === 3 && nextState.number_house === 1) {
      return true;
    } else {
      return false;
    }
  }

  toggleContactOverlay(evt) {
    this.setState({
      didClickOverlay: !this.state.didClickOverlay,
      clicked: evt.target.id
    });
  }

  render() {
    const {representative} = this.props;
    const {number_representatives} = this.state;
    let members,
      actionButton;

    const mobileOverlayClass = cx(
      ['mobile-contact-overlay'],
      {'show': this.state.didClickOverlay}
    );

    if (representative && number_representatives > 2) {
      members = representative.map((result, idx) => {
        actionButton = (
          <ActionButtons
            representative={result}
          />
        );

        const gender = result.gender === 'M' ? 'Him' : 'Her';

        return (<div className="member-container" key={idx}>
          <MemberImg
            bioguide={result.bioguide_id}
            party={result.party}
            repNumber={number_representatives}
          />
          <MemberRibbon
            name={result.full_name}
            state={result.state}
            party={result.party}
          />
          <div
            className="mobile-contact-options"
            onClick={this.toggleContactOverlay}
            id={idx}
          >
            {`Contact ${gender}`}
          </div>
          {actionButton}
        </div>);
      });
    }

    const selectedMember = this.state.clicked ? representative[this.state.clicked] : representative;

    return <div className="member-wrapper">
      {members}
      <div className={mobileOverlayClass}>
        <ActionButtons
          representative={selectedMember}
        />
        <div className="mobile-contact-close-button" onClick={this.toggleContactOverlay} />
      </div>
    </div>;
  }
}

export default CongressmanGroup;
