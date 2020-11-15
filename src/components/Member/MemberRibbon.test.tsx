import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import MemberRibbon from './MemberRibbon';
import { createLegislator, createTerm } from '../../models/Legislator.test';
import { Legislator, Party } from '../../models/Legislator';

const props = {
  legislator: new Legislator(createLegislator('John Smith')),
};

it('renders without crashing', () => {
  const { container, getByText } = render(<MemberRibbon {...props} />);
  expect(container.childElementCount).toBeGreaterThan(0);
  expect(getByText('John Smith', { exact: false })).toBeInTheDocument();
});

it('renders correctly for an independent', () => {
  const legislator = new Legislator({
    ...createLegislator('John Smith'),
    terms: [{ ...createTerm(), party: Party.Independent }],
  });
  const { container } = render(<MemberRibbon legislator={legislator} />);
  const ribbon = container.querySelector('.ribbon');
  expect(ribbon).toBeInTheDocument();
  expect(ribbon?.classList.contains('ribbon--grey')).toBe(true);
});

it('renders correctly for a republican', () => {
  const legislator = new Legislator({
    ...createLegislator('John Smith'),
    terms: [{ ...createTerm(), party: Party.Republican }],
  });
  const { container } = render(<MemberRibbon legislator={legislator} />);
  const ribbon = container.querySelector('.ribbon');
  expect(ribbon).toBeInTheDocument();
  expect(ribbon?.classList.length).toBe(1);
});

it('renders for a democrat', () => {
  const legislator = new Legislator({
    ...createLegislator('John Smith'),
    terms: [{ ...createTerm(), party: Party.Democrat }],
  });
  const { container } = render(<MemberRibbon legislator={legislator} />);
  const ribbon = container.querySelector('.ribbon');
  expect(ribbon).toBeInTheDocument();
  expect(ribbon?.classList.contains('ribbon--blue')).toBe(true);
});
