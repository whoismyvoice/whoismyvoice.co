import React, { FC } from 'react';

// Style
import '../../styles/paymentCounter.scss';

interface Props {
  payment: number;
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
});

export const PaymentCounter: FC<Props> = (props) => {
  const payment = formatter.format(props.payment);
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
        from their top contributing industries
      </span>
    </span>
  );
};
