import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import FadedBg from './FadedBg';

describe('FadedBg', () => {
  it('renders without crashing', () => {
    const { container } = render(<FadedBg />);
    expect(container.querySelector('.faded-bg')).toHaveClass('faded-white');
    expect(container.querySelector('.faded-bg')).toHaveClass('hide');
  });

  it('renders correctly color=black', () => {
    const { container } = render(<FadedBg color="black" />);
    expect(container.querySelector('.faded-bg')).not.toHaveClass('faded-white');
    expect(container.querySelector('.faded-bg')).toHaveClass('hide');
  });

  it('renders correctly didScroll=false', () => {
    const { container } = render(<FadedBg didScroll={false} />);
    expect(container.querySelector('.faded-bg')).toHaveClass('faded-white');
    expect(container.querySelector('.faded-bg')).toHaveClass('hide');
  });

  it('renders correctly didScroll=true', () => {
    const { container } = render(<FadedBg didScroll={true} />);
    expect(container.querySelector('.faded-bg')).toHaveClass('faded-white');
    expect(container.querySelector('.faded-bg')).not.toHaveClass('hide');
  });
});
