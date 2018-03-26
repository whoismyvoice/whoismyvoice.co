import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as renderer from 'react-test-renderer';
import { SearchInput } from './SearchInput';

jest.mock('mixpanel-browser');

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SearchInput name="zipCode" />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders correctly name', () => {
  const tree = renderer.create(<SearchInput name="zipCode" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly name and pattern', () => {
  const tree = renderer
    .create(<SearchInput name="12345" pattern="[a-z]*" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly name and error message', () => {
  const tree = renderer
    .create(<SearchInput name="12345" errorMessage="foo errors" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly name and placeholder', () => {
  const tree = renderer
    .create(<SearchInput name="12345" placeholder="foo errors" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
