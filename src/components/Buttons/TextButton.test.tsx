import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as renderer from 'react-test-renderer';
import TextButton from './TextButton';

const props = {
  link: 'link',
  text: 'text',
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TextButton {...props} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders correctly', () => {
  const tree = renderer.create(<TextButton {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
