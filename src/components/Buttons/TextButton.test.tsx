import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import TextButton from './TextButton';

const props = {
  link: 'link',
  text: 'text',
};

it('renders without crashing', () => {
  const { container } = render(<TextButton {...props} />);
  expect(container).not.toBeNull();
});

it('renders correctly', () => {
  const { container, getByText } = render(<TextButton {...props} />);
  expect(container.querySelector('.text-button-border')).toBeInTheDocument();
  expect(getByText('text')).toBeInTheDocument();
  expect(getByText('text')).toHaveAttribute('href', 'link');
});

it('executes a callback when clicked', () => {
  const onClick = jest.fn();
  const { getByText } = render(<TextButton {...props} onClick={onClick} />);
  const link = getByText(props.text);
  fireEvent.click(link);
  expect(onClick).toHaveBeenCalledTimes(1);
});
