import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as renderer from 'react-test-renderer';
import MemberRibbon from './MemberRibbon';
import { createLegislator } from '../../models/Legislator.test';
import { Legislator } from '../../models/Legislator';

jest.mock('mixpanel-browser');

const props = {
  legislator: new Legislator(createLegislator('John Smith')),
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemberRibbon {...props} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders correctly', () => {
  const tree = renderer.create(<MemberRibbon {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
