import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders without crashing', () => {
    const { container } = render(<App />);
    expect(container.querySelector('.wrapper')).not.toBeNull();
    expect(container.querySelector('.menu-button')).not.toBeNull();
  });
});
