import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { SearchInput } from './SearchInput';

describe('SearchInput', () => {
  it('renders with defaults', async () => {
    const { container } = render(<SearchInput name="zipCode" />);
    const input = container.querySelector('input');
    expect(input).not.toBeNull();
    expect(input).toHaveAttribute('name', 'zipCode');
    expect(container.querySelector('.search-input-message--error')).toBeNull();
    // TODO Test that a change event with bad data sets error state
  });

  it('renders correctly name', () => {
    const { container } = render(<SearchInput name="zipCode" />);
    const input = container.querySelector('input');
    expect(input).not.toBeNull();
    expect(input).toHaveAttribute('name', 'zipCode');
    expect(container.querySelector('.search-input-message--error')).toBeNull();
  });

  it('renders correctly name and pattern', () => {
    const { container } = render(<SearchInput name="12345" pattern="[a-z]*" />);
    const input = container.querySelector('input');
    expect(input).not.toBeNull();
    expect(input).toHaveAttribute('name', '12345');
    expect(input).toHaveAttribute('pattern', '[a-z]*');
    expect(container.querySelector('.search-input-message--error')).toBeNull();
  });

  it('renders correctly name and error message', () => {
    const { container, getByText } = render(
      <SearchInput name="12345" errorMessage="foo errors" />
    );
    const input = container.querySelector('input');
    expect(input).not.toBeNull();
    expect(input).toHaveAttribute('name', '12345');
    expect(getByText('foo errors')).toHaveClass('search-input-message--error');
  });

  it('renders correctly name and placeholder', () => {
    const { getByPlaceholderText } = render(
      <SearchInput name="12345" placeholder="foo errors" />
    );
    const input = getByPlaceholderText('foo errors');
    expect(input).not.toBeNull();
    expect(input).toHaveAttribute('name', '12345');
  });
});
