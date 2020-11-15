import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import MemberImg from './MemberImg';
import { createLegislator, createTerm } from '../../models/Legislator.test';
import { Legislator, Party } from '../../models/Legislator';

it('renders without crashing', () => {
  const legislator = new Legislator(createLegislator('John Smith'));
  const { container, getByAltText } = render(
    <MemberImg legislator={legislator} />
  );
  expect(container).toBeInTheDocument();
  expect(getByAltText(legislator.fullName)).toBeInTheDocument();
});

it('renders correctly for an independent', () => {
  const legislator = new Legislator({
    ...createLegislator('John Smith'),
    terms: [{ ...createTerm(), party: Party.Independent }],
  });
  const { container } = render(<MemberImg legislator={legislator} />);
  const img = container.querySelector('.member-img');
  expect(img).toBeInTheDocument();
  expect(img?.classList.contains('member--grey')).toBe(true);
});

it('renders correctly for a republican', () => {
  const legislator = new Legislator({
    ...createLegislator('John Smith'),
    terms: [{ ...createTerm(), party: Party.Republican }],
  });
  const { container } = render(<MemberImg legislator={legislator} />);
  const img = container.querySelector('.member-img');
  expect(img).toBeInTheDocument();
  expect(img?.classList.length).toBe(1);
});

it('renders correctly for a democrat', () => {
  const legislator = new Legislator({
    ...createLegislator('John Smith'),
    terms: [{ ...createTerm(), party: Party.Democrat }],
  });
  const { container } = render(<MemberImg legislator={legislator} />);
  const img = container.querySelector('.member-img');
  expect(img).toBeInTheDocument();
  expect(img?.classList.contains('member--blue')).toBe(true);
});
