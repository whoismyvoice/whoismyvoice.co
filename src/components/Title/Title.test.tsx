import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Title from './Title';

jest.mock('mixpanel-browser');

it('renders correctly no props', () => {
  const tree = renderer.create(<Title />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with className', () => {
  const tree = renderer.create(<Title className="foo" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with templateData', () => {
  const data = {
    foo: 'bar',
  };
  const tree = renderer.create(<Title templateData={data} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with templateString', () => {
  const templateString = `My template string.`;
  const tree = renderer
    .create(<Title templateString={templateString} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with templateData & templateString', () => {
  const templateString = `My template string <%= foo %>.`;
  const data = {
    foo: 'bar',
  };
  const tree = renderer
    .create(<Title templateData={data} templateString={templateString} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
