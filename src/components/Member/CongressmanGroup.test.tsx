import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as renderer from 'react-test-renderer';
import CongressmanGroup from './CongressmanGroup';
import { createLegislator } from '../../models/Legislator.test';
import { Legislator } from '../../models/Legislator';

const baseProps = {
  allLegislators: [],
  legislators: [],
  section: 1,
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CongressmanGroup {...baseProps} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders correctly without a legislator', () => {
  const props = {
    ...baseProps,
  };
  const tree = renderer.create(<CongressmanGroup {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with a legislator', () => {
  const props = {
    ...baseProps,
    legislators: [new Legislator(createLegislator('John Smith'))],
  };
  const tree = renderer.create(<CongressmanGroup {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with a legislator and contribution', () => {
  const props = {
    ...baseProps,
    legislators: [new Legislator(createLegislator('John Smith'))],
  };
  const tree = renderer.create(<CongressmanGroup {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
