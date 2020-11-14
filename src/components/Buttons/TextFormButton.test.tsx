import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import TextFormButton from './TextFormButton';

const props = {
  text: 'text',
};

it('renders without crashing', () => {
  const { container } = render(<TextFormButton {...props} />);
  expect(container).not.toBeNull();
});

it('renders correctly', () => {
  const { container, getByText } = render(<TextFormButton {...props} />);
  expect(container.querySelector('.text-button-border')).toBeInTheDocument();
  expect(getByText('text')).toBeInTheDocument();
  expect(getByText('text')).toHaveAttribute('type', 'submit');
  expect(getByText('text').tagName).toMatch(/button/i);
});

it('executes a callback when clicked', () => {
  const onClick = jest.fn();
  const { getByText } = render(<TextFormButton {...props} onClick={onClick} />);
  const link = getByText(props.text);
  fireEvent.click(link);
  expect(onClick).toHaveBeenCalledTimes(1);
});
