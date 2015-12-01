import React from 'react';
import ReactDOMServer from 'react-dom/server';
import FadedBg from '../../src/components/FadedBg.js';
import * as utils from '../utils';
import TestUtils from 'react-addons-test-utils';

describe('Components', () => {
  describe('FadedBG', () => {
    const component = utils.shallowlyRenderedOutput(<FadedBg />);
    const markup = ReactDOMServer.renderToStaticMarkup(<FadedBg />);

    const main = '<div class="faded-bg hide"></div>';

    it('Should have a div as container', () => {
      expect(component.type).to.equal('div');
    });

    it('Should have div w. faded-bg hide classes', () => {
      expect(markup).to.contain(main);
    });
  });
});
