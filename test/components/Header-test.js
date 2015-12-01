import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Header from '../../src/components/Header.js';
import Button from '../../src/components/Button.js';
import * as utils from '../utils';
import TestUtils from 'react-addons-test-utils';

describe('Components', () => {
  describe('Header', () => {
    const component = utils.shallowlyRenderedOutput(<Header />);
    const markup = ReactDOMServer.renderToStaticMarkup(<Header />);
    const ButtonComponent = ReactDOMServer.renderToStaticMarkup(<Button color={'white-text'} link="/sources" text="Data Sources" />);

    const burgerIcon = '<div class="burger-icon"></div>';

    it('Should have a div as container', () => {
      expect(component.type).to.equal('div');
    });

    it('Should contain burger menu icon', () => {
      expect(markup).to.contain(burgerIcon);
    });

    it('Should contain at least one button', () => {
      expect(markup).to.contain(ButtonComponent);
    });
  });
});
