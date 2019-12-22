import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as renderer from 'react-test-renderer';
import { ElectionCycle } from '../../models/ElectionCycle';
import Sources from './Sources';

jest.mock('mixpanel-browser');

const cycles: ElectionCycle[] = [
  { year: '2018', label: '2017-2018' },
  { year: '2020', label: '2019-2020' },
];

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Sources cycles={cycles} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders correctly', () => {
  const tree = renderer.create(<Sources cycles={cycles} />).toJSON();
  expect(tree).toMatchSnapshot();
});
