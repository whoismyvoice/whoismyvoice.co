import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import ActionButtons from './ActionButtons';
import { createLegislator } from '../../models/Legislator.test';
import { Legislator } from '../../models/Legislator';

it('renders without crashing', () => {
  const legislator = new Legislator(createLegislator('John Smith'));
  const { container } = render(<ActionButtons legislator={legislator} />);
  expect(container).toBeInTheDocument();
  expect(container.querySelector('.actionButtons')).toBeInTheDocument();
  expect(
    container.querySelector('.button__small__icon.phone')
  ).toBeInTheDocument();
});

it('has no twitter contact if no channels', () => {
  const legislator = new Legislator({
    ...createLegislator('John Smith'),
    channels: [],
  });
  const { container } = render(<ActionButtons legislator={legislator} />);
  expect(container.querySelector('.button__small__icon.twitter')).toBeNull();
});

it('has twitter contact if twitter channel', () => {
  const legislator = new Legislator({
    ...createLegislator('John Smith'),
    channels: [{ id: 'johnsmith', type: 'Twitter' }],
  });
  const { container } = render(<ActionButtons legislator={legislator} />);
  expect(
    container.querySelector('.button__small__icon.twitter')
  ).toBeInTheDocument();
});
