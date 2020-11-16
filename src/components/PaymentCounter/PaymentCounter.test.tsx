import React from 'react';
import { render } from '@testing-library/react';
import { PaymentCounter } from './PaymentCounter';

it('renders correctly payment=0', () => {
  const { container, getByText } = render(<PaymentCounter payment={0} />);
  expect(container.querySelector('.member__payment')).not.toBeNull();
  expect(container.querySelectorAll('.counter__digit')).toHaveLength(2);
  expect(getByText('Received')).not.toBeNull();
  expect(getByText('from their top contributing industries')).not.toBeNull();
});

it('renders correctly payment=1000', () => {
  const { container, getByText } = render(<PaymentCounter payment={1000} />);
  expect(container.querySelector('.member__payment')).not.toBeNull();
  expect(container.querySelectorAll('.counter__digit')).toHaveLength(6);
  expect(getByText('Received')).not.toBeNull();
  expect(getByText('from their top contributing industries')).not.toBeNull();
});

it('renders correctly payment=50000', () => {
  const { container, getByText } = render(<PaymentCounter payment={50000} />);
  expect(container.querySelector('.member__payment')).not.toBeNull();
  expect(container.querySelectorAll('.counter__digit')).toHaveLength(7);
  expect(getByText('Received')).not.toBeNull();
  expect(getByText('from their top contributing industries')).not.toBeNull();
});
