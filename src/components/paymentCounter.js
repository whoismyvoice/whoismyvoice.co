import React from 'react';

// Component
import BaseComponent from './BaseComponent';

class paymentCounter extends BaseComponent {
  render() {
    const numbers = this.props.payment.split('');
    const digits = numbers.map((result, idx) => {
      return <span className="counter__digit" key={idx}>
        {result}
        <span className="counter__gradient-top"></span>
      </span>;
    });

    return <span className="member__payment">
      <span className="counter__accept">
        Accepted
      </span>
      <span className="counter__digit digit__margin">$
        <span className="counter__gradient-top"></span>
      </span>
      {digits}
      <span className="counter__from">
        from the NRA
      </span>
    </span>;
  }
}

export default paymentCounter;
