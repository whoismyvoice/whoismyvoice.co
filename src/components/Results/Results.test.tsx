import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { Results } from './Results';
import { createLegislator, createTerm } from '../../models/Legislator.test';

it('renders correctly with empty props', () => {
  const props = {
    representatives: [],
    sectorContributions: {},
  };
  const { container, queryByText, queryByTestId } = render(
    <Results {...props} />
  );
  expect(container).toBeInTheDocument();
  expect(queryByTestId('result-section-1')).toBeNull();
  expect(queryByText('Search Another Zip Code')).toBeNull();
});

it('renders correctly with one legislator', () => {
  const props = {
    representatives: [createLegislator('John Smith')],
    sectorContributions: {},
  };
  const { container, getByTestId, getByText, queryByTestId } = render(
    <Results {...props} />
  );
  expect(container).toBeInTheDocument();
  expect(getByTestId('result-section-1')).toBeInTheDocument();
  expect(queryByTestId('result-section-2')).toBeNull();
  expect(getByText('Search Another Zip Code')).toBeInTheDocument();
});

it('renders correctly with two legislators', () => {
  const props = {
    representatives: [
      createLegislator('John Smith'),
      createLegislator('John Smith Jr.'),
    ],
    sectorContributions: {},
  };
  const { container, getByTestId, getByText, queryByTestId } = render(
    <Results {...props} />
  );
  expect(container).toBeInTheDocument();
  expect(getByTestId('result-section-1')).toBeInTheDocument();
  expect(queryByTestId('result-section-2')).toBeNull();
  expect(getByText('Search Another Zip Code')).toBeInTheDocument();
});

it('renders correctly with three legislators', () => {
  const props = {
    representatives: [
      createLegislator('John Smith'),
      createLegislator('John Smith Jr'),
      { ...createLegislator('John Smith III'), terms: [createTerm('rep')] },
    ],
    sectorContributions: {},
  };
  const { container, getByTestId, getByText } = render(<Results {...props} />);
  expect(container).toBeInTheDocument();
  expect(getByTestId('result-section-1')).toBeInTheDocument();
  expect(getByTestId('result-section-2')).toBeInTheDocument();
  expect(getByText('Search Another Zip Code')).toBeInTheDocument();
});
