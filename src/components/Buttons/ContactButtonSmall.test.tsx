import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import ContactButtonSmall from './ContactButtonSmall';

const props = {
  icon: 'icon',
  link: 'link',
  text: 'text',
};

describe('ContactButtonSmall', () => {
  it('renders correctly', () => {
    const { container, getByText } = render(<ContactButtonSmall {...props} />);
    expect(getByText(props.text)).toBeInTheDocument();
    expect(
      container.querySelector('.button__small__icon.icon')
    ).toBeInTheDocument();
  });
});
