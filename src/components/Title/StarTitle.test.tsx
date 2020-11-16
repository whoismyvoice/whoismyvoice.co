import React from 'react';
import { render } from '@testing-library/react';
import StarTitle from './StarTitle';

it('renders correctly no props', () => {
  const { container, getByText } = render(
    <StarTitle>
      Funders <strong>exist</strong>
    </StarTitle>
  );
  expect(container.querySelector('.three-stars')).not.toBeNull();
  expect(getByText('exist').tagName).toMatch(/strong/i);
});
