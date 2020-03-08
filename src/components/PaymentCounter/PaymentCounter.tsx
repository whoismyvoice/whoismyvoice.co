import * as React from 'react';

// Constants
import { ORGANIZATION_DISPLAY } from '../../constants';
// Style
import '../../styles/paymentCounter.scss';

interface Props {
  payment: string;
}

class PaymentCounter extends React.Component<Props> {
  render(): JSX.Element {
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
