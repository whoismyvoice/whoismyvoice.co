import React from 'react';
import MemberList from '../../src/components/App.js';
import * as utils from '../utils';

describe('MemberList', () => {
  describe('App', () => {
    const component = utils.shallowlyRenderedOutput(<MemberList />);

    it('should have a div as container', () => {
      expect(component.type).to.equal('div');
    });
  });
});
