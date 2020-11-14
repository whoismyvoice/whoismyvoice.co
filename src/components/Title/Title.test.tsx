import React from 'react';
import { render } from '@testing-library/react';
import Title from './Title';

it('renders correctly no props', () => {
  const { container } = render(<Title />);
  expect(container).toBeDefined();
});

it('renders correctly with className', () => {
  const { container } = render(<Title className="foo" />);
  expect(container.querySelector('.foo')).not.toBeNull();
  expect(
    container.querySelector('.foo')?.classList.contains('title-component')
  ).toBe(true);
});

it('renders correctly with templateData', () => {
  const { getByText } = render(
    <Title>
      Foo <em>bar</em>
    </Title>
  );
  expect(getByText('Foo')).not.toBeNull();
  expect(getByText('bar').tagName).toMatch(/em/i);
});

it('renders correctly with templateString', () => {
  const templateString = `My template string.`;
  const { getByText } = render(<Title>{templateString}</Title>);
  expect(getByText(templateString)).not.toBeNull();
});

it('renders correctly with templateData & templateString', () => {
  const data = {
    foo: 'bar',
  };
  const { getByText } = render(<Title>My template string {data.foo}</Title>);
  expect(getByText('My template string bar')).not.toBeNull();
});
