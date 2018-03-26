import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as renderer from 'react-test-renderer';
import FadedBg from './FadedBg';

jest.mock('mixpanel-browser');

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FadedBg />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders correctly no props', () => {
  const tree = renderer.create(<FadedBg />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly color=black', () => {
  const tree = renderer.create(<FadedBg color="black" />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly didScroll=false', () => {
  const tree = renderer.create(<FadedBg didScroll={false} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly didScroll=true', () => {
  const tree = renderer.create(<FadedBg didScroll={true} />).toJSON();
  expect(tree).toMatchSnapshot();
});
