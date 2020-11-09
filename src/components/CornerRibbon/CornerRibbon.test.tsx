import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as renderer from 'react-test-renderer';
import CornerRibbon from './CornerRibbon';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CornerRibbon />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders correctly no props', () => {
  const tree = renderer.create(<CornerRibbon />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly didSearch=true', () => {
  const tree = renderer.create(<CornerRibbon didSearch={true} />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly didSearch=false', () => {
  const tree = renderer.create(<CornerRibbon didSearch={false} />).toJSON();
  expect(tree).toMatchSnapshot();
});
