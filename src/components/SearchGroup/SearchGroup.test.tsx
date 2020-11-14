import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import { SearchGroup } from './SearchGroup';

it('renders without crashing', () => {
  const { container } = render(<SearchGroup isStreetAddressNeeded={false} />);
  expect(container).toBeInTheDocument();
});

it('renders correctly', () => {
  const { getByTestId } = render(<SearchGroup isStreetAddressNeeded={false} />);
  expect(getByTestId('search-group')).toBeInTheDocument();
  expect(getByTestId('search-address')).toBeInTheDocument();
});
