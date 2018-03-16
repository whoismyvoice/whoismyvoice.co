import React, { Component } from 'react';

// Constants
import { ORGANIZATION_DISPLAY } from '../constants';
// Style
import './../styles/paymentCounter.css';

class PaymentCounter extends Component {
  render() {
    const numbers = this.props.payment.split('');
    const digits = numbers.map((result, idx) => {
      return (
        <span className="counter__digit" key={idx}>
          {result}
          <span className="counter__gradient-top" />
        </span>
      );
    });

    return (
      <span className="member__payment">
        <span className="counter__accept">Accepted</span>
        <span className="counter__digit digit__margin">
          $
          <span className="counter__gradient-top" />
        </span>
        {digits}
        <span className="counter__from">from {ORGANIZATION_DISPLAY}</span>
      </span>
    );
  }
}

export default PaymentCounter;
