import * as React from 'react';
import * as renderer from 'react-test-renderer';
import MemberResults from './MemberResults';
import { Legislator } from '../../models/Legislator';
import { createLegislator as createLegislatorRecord } from '../../models/Legislator.test';

function createLegislator(name: string): Legislator {
  return new Legislator(createLegislatorRecord(name));
}

it('renders correctly with empty props', () => {
  const props = {
    legislators: [],
    section: 1,
    sectors: [],
  };
  const tree = renderer.create(<MemberResults {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with contribution and legislator', () => {
  const props = {
    legislators: [createLegislator('John Smith')],
    section: 1,
    sectors: [],
  };
  const tree = renderer.create(<MemberResults {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with two contributions and legislators', () => {
  const props = {
    legislators: [
      createLegislator('John Smith'),
      createLegislator('John Smith Jr.'),
    ],
    section: 1,
    sectors: [],
  };
  const tree = renderer.create(<MemberResults {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with three contributions and legislators', () => {
  const props = {
    legislators: [
      createLegislator('John Smith'),
      createLegislator('John Smith Jr.'),
      createLegislator('John Smith III'),
    ],
    section: 1,
    sectors: [],
  };
  const tree = renderer.create(<MemberResults {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
