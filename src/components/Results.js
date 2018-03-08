import React, { Component, } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

// Components
import TextButton from './Buttons/TextButton';
import MemberResults from './MemberResults';
import { PropType as PaymentType, } from '../models/Payment';
import { Legislator, PropType as LegislatorType, } from '../models/Legislator';

export class Results extends Component {
  static defaultProps = {
    backgroundClasses: '',
    destroy: () => {},
    didSearch: false,
    payments: [],
    representatives: [],
  }

  static propTypes = {
    backgroundClasses: PropTypes.any,
    destroy: PropTypes.func,
    didSearch: PropTypes.bool.isRequired,
    payments: PropTypes.arrayOf(PaymentType),
    representatives: PropTypes.arrayOf(LegislatorType),
  }

  render() {
    const {
      didSearch,
      payments,
      representatives,
    } = this.props;

    const backgroundClasses = cx(
      [
        'second-wrapper',
      ],
      {
        'move-up': didSearch,
      },
    );

    const legislators = representatives.map(rep => new Legislator(rep));
    const getAmount = Legislator.getPaymentAmount.bind(this, payments);
    const first_rep = legislators.filter(rep => getAmount(rep) > 0);
    const second_rep = legislators.filter(rep => getAmount(rep) === 0);
    const sections = [ first_rep, second_rep, ]
      .filter(partition => partition.length > 0)
      .map((partition, index) => (
        <div key={partition.reduce((key, legislator) => (key + legislator.identifier), '')} className="section block section-two">
          <TextButton
            text="Back"
            onClick={this._handleRestart}
          />
          <MemberResults
            didSearch={didSearch}
            legislators={partition}
            payments={payments}
            section={index + 1}
          />
        </div>
      ));

    return (
      <div className={backgroundClasses} id="fullpage">
        {sections}
      </div>
    );
  }
}

export default Results;
