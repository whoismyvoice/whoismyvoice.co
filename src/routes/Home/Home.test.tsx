import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Home } from './Home';
import store from '../../store';

const props = {
  didSearch: false,
  numberHouse: 0,
  numberRepresentatives: 0,
  representatives: [],
  sectorContributions: {},
};

it('renders without crashing', () => {
  const { container } = render(
    <Provider store={store}>
      <Home {...props} />
    </Provider>
  );
  expect(container).not.toBeNull();
});

it('renders correctly', () => {
  const { getByText, getByTestId, queryByTestId } = render(
    <Provider store={store}>
      <Home {...props} />
    </Provider>
  );
  expect(
    getByText(
      'This site is only supported in portrait mode. Please turn your phone.'
    )
  ).toBeDefined();
  expect(getByText('Learn about who funds the campaigns of')).toBeDefined();
  expect(getByText('your representatives!')).toBeDefined();
  expect(getByTestId('search-group')).toBeDefined();
  expect(queryByTestId('result-section-1')).toBeNull();
});
