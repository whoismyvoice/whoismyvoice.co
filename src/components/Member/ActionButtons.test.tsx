import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as renderer from 'react-test-renderer';
import ActionButtons from './ActionButtons';
import { createLegislator } from '../../models/Legislator.test';
import { Legislator } from '../../models/Legislator';

const props = {
  legislator: new Legislator(createLegislator('John Smith')),
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ActionButtons {...props} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders correctly', () => {
  const tree = renderer.create(<ActionButtons {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
