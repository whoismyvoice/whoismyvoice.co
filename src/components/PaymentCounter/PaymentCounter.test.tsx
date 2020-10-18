import * as React from 'react';
import * as renderer from 'react-test-renderer';
import PaymentCounter from './PaymentCounter';

jest.mock('mixpanel-browser');

it('renders correctly payment=0', () => {
  const tree = renderer
    .create(<PaymentCounter numContributors={5} payment={0} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly payment=1000', () => {
  const tree = renderer
    .create(<PaymentCounter numContributors={5} payment={1000} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly payment=50000', () => {
  const tree = renderer
    .create(<PaymentCounter numContributors={10} payment={50000} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
