import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { Results } from './Results';
import { createContribution } from '../../models/Contribution.test';
import { createLegislator } from '../../models/Legislator.test';

jest.mock('mixpanel-browser');

it('renders correctly with empty props', () => {
  const props = {
    contributions: [],
    representatives: [],
  };
  const tree = renderer.create(<Results {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with contribution and legislator', () => {
  const props = {
    contributions: [createContribution('John Smith')],
    representatives: [createLegislator('John Smith')],
  };
  const tree = renderer.create(<Results {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with two contributions and legislators', () => {
  const props = {
    contributions: [
      createContribution('John Smith'),
      createContribution('John Smith Jr.'),
    ],
    representatives: [
      createLegislator('John Smith'),
      createLegislator('John Smith Jr.'),
    ],
  };
  const tree = renderer.create(<Results {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with three contributions and legislators', () => {
  const props = {
    contributions: [
      createContribution('John Smith'),
      createContribution('John Smith Jr.'),
      createContribution('John Smith III'),
    ],
    representatives: [
      createLegislator('John Smith'),
      createLegislator('John Smith Jr.'),
      createLegislator('John Smith III'),
    ],
  };
  const tree = renderer.create(<Results {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
