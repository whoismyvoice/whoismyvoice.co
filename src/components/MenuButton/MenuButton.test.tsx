import React from 'react';
import { render } from '@testing-library/react';
import { StaticRouter as Router } from 'react-router-dom';
import { MenuButton } from './MenuButton';

describe('MenuButton', () => {
  it('renders the links', () => {
    const { container, getByText } = render(
      <Router>
        <MenuButton />
      </Router>
    );
    expect(getByText('Data sources')).not.toBeNull();
    expect(getByText('About this project')).not.toBeNull();
    expect(getByText('Home')).not.toBeNull();
    const menuContainer = container.querySelector('.menu-container');
    expect(menuContainer?.childElementCount).toBe(3);
  });

  it('renders the closed menu', () => {
    const { getByTestId } = render(
      <Router>
        <MenuButton />
      </Router>
    );
    // button expectations
    const button = getByTestId('menu-button');
    expect(button).not.toBeNull();
    expect(button?.classList).toContain('animated');
    expect(button?.classList.length).toBe(2);
    // menu expectations
    const menu = getByTestId('menu-overlay');
    expect(menu).not.toBeNull();
    expect(menu?.classList.length).toBe(1);
  });

  it('renders the open menu', () => {
    const { getByTestId } = render(
      <Router>
        <MenuButton isMenuOpen={true} />
      </Router>
    );
    // button expectations
    const button = getByTestId('menu-button');
    expect(button).not.toBeNull();
    expect(button?.classList).toContain('animated');
    expect(button?.classList).toContain('menu-button--clicked');
    expect(button?.classList.length).toBe(3);
    // menu expectations
    const menu = getByTestId('menu-overlay');
    expect(menu).not.toBeNull();
    expect(menu?.classList).toContain('menu-overlay--white');
    expect(menu?.classList).not.toContain('menu-overlay--show');
  });

  it('renders the open menu after search', () => {
    const { getByTestId } = render(
      <Router>
        <MenuButton isMenuOpen={true} didSearch={true} />
      </Router>
    );
    // button expectations
    const button = getByTestId('menu-button');
    expect(button).not.toBeNull();
    expect(button?.classList).toContain('animated');
    expect(button?.classList).toContain('menu-button--clicked');
    expect(button?.classList.length).toBe(3);
    // menu expectations
    const menu = getByTestId('menu-overlay');
    expect(menu).not.toBeNull();
    expect(menu?.classList).not.toContain('menu-overlay--white');
    expect(menu?.classList).toContain('menu-overlay--show');
  });
});
