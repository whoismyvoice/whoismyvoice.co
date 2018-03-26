import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as renderer from 'react-test-renderer';
import { SearchAddress } from './SearchAddress';

jest.mock('mixpanel-browser');

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SearchAddress isStreetAddressNeeded={false} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('street address not needed', () => {
  const props = {
    isStreetAddressNeeded: false,
  };

  it('renders correctly', () => {
    const tree = renderer.create(<SearchAddress {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with error message', () => {
    const tree = renderer
      .create(<SearchAddress {...props} addressErrorMessage="foo errors" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with placeholder', () => {
    const tree = renderer
      .create(<SearchAddress {...props} placeholder="fooholder" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('street address needed', () => {
  const props = {
    isStreetAddressNeeded: true,
    zipCode: '12345',
  };

  it('renders correctly', () => {
    const tree = renderer.create(<SearchAddress {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with error message', () => {
    const tree = renderer
      .create(<SearchAddress {...props} addressErrorMessage="foo errors" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly with placeholder', () => {
    const tree = renderer
      .create(<SearchAddress {...props} placeholder="fooholder" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
