import * as React from 'react';
import * as renderer from 'react-test-renderer';
import StarTitle from './StarTitle';

it('renders correctly no props', () => {
  const tree = renderer.create(<StarTitle />).toJSON();
  expect(tree).toMatchSnapshot();
});
