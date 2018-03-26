import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as renderer from 'react-test-renderer';
import TextFormButton from './TextFormButton';

jest.mock('mixpanel-browser');

const props = {
  text: 'text',
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TextFormButton {...props} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders correctly', () => {
  const tree = renderer.create(<TextFormButton {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
