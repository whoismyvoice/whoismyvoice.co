import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as renderer from 'react-test-renderer';
import ContactButtonSmall from './ContactButtonSmall';

jest.mock('mixpanel-browser');

const props = {
  icon: 'icon',
  link: 'link',
  text: 'text',
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ContactButtonSmall {...props} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders correctly', () => {
  const tree = renderer.create(<ContactButtonSmall {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
