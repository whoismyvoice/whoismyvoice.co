import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as renderer from 'react-test-renderer';
import MemberImg from './MemberImg';
import { createLegislator } from '../../models/Legislator.test';
import { Legislator } from '../../models/Legislator';

jest.mock('mixpanel-browser');

const props = {
  legislator: new Legislator(createLegislator('John Smith')),
  repNumber: 1,
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemberImg {...props} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders correctly', () => {
  const tree = renderer.create(<MemberImg {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
