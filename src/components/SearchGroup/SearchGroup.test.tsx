import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as renderer from 'react-test-renderer';

import { SearchGroup } from './SearchGroup';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SearchGroup isStreetAddressNeeded={false} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders correctly', () => {
  const tree = renderer
    .create(<SearchGroup isStreetAddressNeeded={false} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
