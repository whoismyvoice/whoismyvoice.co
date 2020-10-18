import * as React from 'react';

// Style
import '../../styles/paymentCounter.scss';

interface Props {
  numContributors: number;
  payment: number;
}

class PaymentCounter extends React.Component<Props> {
  get formatter(): Intl.NumberFormat {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    });
  }

  render(): JSX.Element {
    const payment = this.formatter.format(this.props.payment);
    const numbers = payment.split('');
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
        {digits}
        <span className="counter__from">
          from their top {this.props.numContributors} contributing industries
        </span>
      </span>
    );
  }
}

export default PaymentCounter;
