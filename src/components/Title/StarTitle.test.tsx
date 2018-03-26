import * as React from 'react';
import * as renderer from 'react-test-renderer';
import StarTitle from './StarTitle';

jest.mock('mixpanel-browser');

it('renders correctly no props', () => {
  const tree = renderer.create(<StarTitle />).toJSON();
  expect(tree).toMatchSnapshot();
});
