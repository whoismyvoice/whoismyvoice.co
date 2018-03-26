import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { Home } from './Home';
import store from '../../store';

jest.mock('mixpanel-browser');

const props = {
  didSearch: false,
  numberHouse: 0,
  numberRepresentatives: 0,
  contributions: [],
  representatives: [],
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <Home {...props} />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it('renders correctly', () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <Home {...props} />
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
