import React from 'react';
import { render } from '@testing-library/react';
import About from './About';

describe('About', () => {
  it('renders correctly', () => {
    const { container, getByText, getByAltText } = render(<About />);
    expect(container.childElementCount).toBeGreaterThan(0);
    expect(getByText('About')).not.toBeNull();
    expect(getByText('questions [at] whoismyvoice [dot] co').tagName).toMatch(
      /a/i
    );
    expect(getByText('contact [at] whoismyvoice [dot] co').tagName).toMatch(
      /a/i
    );
    expect(getByAltText('Siberia').tagName).toMatch(/img/i);
    expect(
      getByText('unaffiliated with any government or lobbying party', {
        exact: false,
      })
    ).not.toBeNull();
  });
});
