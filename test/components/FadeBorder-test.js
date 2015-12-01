import React from 'react';
import ReactDOMServer from 'react-dom/server';
import FadeBorder from '../../src/components/FadeBorder.js';
import * as utils from '../utils';
import TestUtils from 'react-addons-test-utils';

describe('Components', () => {
  describe('FadeBorder', () => {
    const component = utils.shallowlyRenderedOutput(<FadeBorder />);
    const markup = ReactDOMServer.renderToStaticMarkup(<FadeBorder />);

    const leftBlur = '<div id="left-blur" class=""></div>';
    const rightBlur = '<div id="right-blur" class=""></div>';

    it('Should have a div as container', () => {
      expect(component.type).to.equal('div');
    });

    it('Should contain a div w. right-blur id', () => {
      expect(markup).to.contain(rightBlur);
    });

    it('Should contain a div w. left-blur id', () => {
      expect(markup).to.contain(leftBlur);
    });

  });
});
