import * as React from 'react';

// Style
import '../../styles/paymentCounter.scss';

interface Props {
  numContributors: number;
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
        <span className="counter__accept">Received</span>
        <span className="counter__digit digit__margin">
          $
          <span className="counter__gradient-top" />
        </span>
        {digits}
        <span className="counter__from">
          from their top {this.props.numContributors} contributing industries
        </span>
      </span>
    );
  }
}

export default PaymentCounter;
