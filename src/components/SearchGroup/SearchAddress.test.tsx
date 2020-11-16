import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { SearchAddress } from './SearchAddress';

describe('street address not needed', () => {
  const props = {
    isStreetAddressNeeded: false,
  };

  it('renders correctly', () => {
    const { getByTestId } = render(<SearchAddress {...props} />);
    expect(getByTestId('search-address')).toBeInTheDocument();
  });

  it('renders correctly with error message', () => {
    const { getByText } = render(
      <SearchAddress {...props} addressErrorMessage="foo errors" />
    );
    expect(getByText('foo errors')).toBeInTheDocument();
  });

  it('renders correctly with placeholder', () => {
    const { getByPlaceholderText } = render(
      <SearchAddress {...props} placeholder="fooholder" />
    );
    expect(getByPlaceholderText('fooholder')).toBeInTheDocument();
  });
});

describe('street address needed', () => {
  const props = {
    isStreetAddressNeeded: true,
    zipCode: '12345',
  };

  it('renders correctly', () => {
    const { getByText } = render(<SearchAddress {...props} />);
    expect(getByText('ZIP: 12345')).toBeInTheDocument();
  });

  it('renders correctly with error message', () => {
    const { getByText } = render(
      <SearchAddress {...props} addressErrorMessage="foo errors" />
    );
    expect(getByText('ZIP: 12345')).toBeInTheDocument();
    expect(getByText('foo errors')).toBeInTheDocument();
  });

  it('renders correctly with placeholder', () => {
    const { getByPlaceholderText, getByText } = render(
      <SearchAddress {...props} placeholder="fooholder" />
    );
    expect(getByText('ZIP: 12345')).toBeInTheDocument();
    expect(getByPlaceholderText('fooholder')).toBeInTheDocument();
  });
});
