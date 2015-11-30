import React from 'react';
import About from '../../src/components/About.js';
import * as utils from '../utils';
import TestUtils from 'react-addons-test-utils';

describe('Components', () => {
  describe('About', () => {
    const component = utils.shallowlyRenderedOutput(<About />);
    const markup = React.renderToStaticMarkup(<About />);
    const introduction = '<p class="page-introduction">';
    const fadedbg = '<div class="faded-bg faded-white hide"></div>';

    it('Should have a div as container', () => {
      expect(component.type).to.equal('div');
    });

    it('Should contain FadedBG w. value White', () => {
      expect(markup).to.contain(fadedbg);
    });

    it('Should contain page introduction paragraph', () => {
      expect(markup).to.contain(introduction);
    });
  });
});
