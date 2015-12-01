import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Button from '../../src/components/Button.js';
import * as utils from '../utils';
import TestUtils from 'react-addons-test-utils';

describe('Components', () => {
  describe('Button', () => {
    const component = utils.shallowlyRenderedOutput(<Button />);
    const markup = ReactDOMServer.renderToStaticMarkup(<Button />);
    const external = ReactDOMServer.renderToStaticMarkup(<Button type={'external'} />);
    const internal = ReactDOMServer.renderToStaticMarkup(<Button type={'internal'} />);

    it('Should contain a link', () => {
      expect(markup).to.contain('a');
    });

    it('Should contain a button component', () => {
      expect(markup).to.contain('button');
    });

    it('Button linking externally should contain button-text div', () => {
      expect(external).to.contain('button-text');
    });

    it('Button linking internal shouldnt contain button-text div', () => {
      expect(internal).to.not.contain('button-text');
    });
  });
});
