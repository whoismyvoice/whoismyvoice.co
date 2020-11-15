import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import MemberResults from './MemberResults';
import { Legislator } from '../../models/Legislator';
import { createLegislator as createLegislatorRecord } from '../../models/Legislator.test';

function createLegislator(name: string): Legislator {
  return new Legislator(createLegislatorRecord(name));
}

it('renders correctly with empty props', () => {
  const props = {
    legislators: [],
    sectors: [],
    sectorContributions: {},
  };
  const { container } = render(<MemberResults {...props} />);
  expect(container.childElementCount).toBe(0);
  expect(container.querySelector('.title-component--results')).toBeNull();
  expect(container.querySelector('.member-wrapper')).toBeNull();
});

it('renders correctly with contribution and legislator', () => {
  const props = {
    legislators: [createLegislator('John Smith')],
    sectors: [],
    sectorContributions: {},
  };
  const { container, getByText } = render(<MemberResults {...props} />);
  expect(
    container.querySelector('.title-component--results')
  ).toBeInTheDocument();
  expect(container.querySelector('.member-wrapper')).toBeInTheDocument();
  expect(container.querySelectorAll('.member-container').length).toBe(1);
  expect(getByText('John Smith', { exact: false })).toBeInTheDocument();
});

it('renders correctly with two contributions and legislators', () => {
  const props = {
    legislators: [
      createLegislator('John Smith I'),
      createLegislator('John Smith Jr.'),
    ],
    sectors: [],
    sectorContributions: {},
  };
  const { container, getByText } = render(<MemberResults {...props} />);
  expect(
    container.querySelector('.title-component--results')
  ).toBeInTheDocument();
  expect(container.querySelector('.member-wrapper')).toBeInTheDocument();
  expect(container.querySelectorAll('.member-container').length).toBe(2);
  expect(getByText('John Smith I', { exact: false })).toBeInTheDocument();
  expect(getByText('John Smith Jr.', { exact: false })).toBeInTheDocument();
});

it('renders correctly with three contributions and legislators', () => {
  const props = {
    legislators: [
      createLegislator('John Smith 1'),
      createLegislator('John Smith Jr.'),
      createLegislator('John Smith III'),
    ],
    section: 1,
    sectors: [],
  };
  const { container, getByText } = render(<MemberResults {...props} />);
  expect(
    container.querySelector('.title-component--results')
  ).toBeInTheDocument();
  expect(container.querySelector('.member-wrapper')).toBeInTheDocument();
  expect(container.querySelectorAll('.member-container').length).toBe(3);
  expect(getByText('John Smith 1', { exact: false })).toBeInTheDocument();
  expect(getByText('John Smith Jr.', { exact: false })).toBeInTheDocument();
  expect(getByText('John Smith III', { exact: false })).toBeInTheDocument();
});
