import React from 'react';
import ReactDOMServer from 'react-dom/server';
import HFCGroup from '../../src/components/Member/HFCGroup.js';
import MemberImg from '../../src/components/Member/MemberImg.js';
import MemberName from '../../src/components/Member/MemberName.js';
import * as utils from '../utils';
import TestUtils from 'react-addons-test-utils';

describe('Components', () => {
  describe('House Freedom Caucus Member', () => {
    const component = utils.shallowlyRenderedOutput(<HFCGroup />);
    const member = '<div class="HFCMember">';

    const markup = ReactDOMServer.renderToStaticMarkup(
      <HFCGroup
        name="Thomas"
        age="12"
        bioguide="123456"
        state="New York"
        twitter="thomasoc"
        did_search={true}
      />
    );

    const MemberImage = ReactDOMServer.renderToStaticMarkup(
      <MemberImg
        group={'true'}
        bioguide="123456"
      />
    );

    const MemberNameComponent = ReactDOMServer.renderToStaticMarkup(
      <MemberName
        name="Thomas"
        age="12"
        state="New York"
        twitter="thomasoc"
        did_search={true}
      />
    );

    it('Should have a div as container', () => {
      expect(component.type).to.equal('a');
    });

    it('Should contain at least one member', () => {
      expect(markup).to.contain(member);
    });

    it('Should contain a MemberImg component', () => {
      expect(markup).to.contain(MemberImage);
    });

    it('Should contain a MemberName component', () => {
      expect(markup).to.contain(MemberNameComponent);
    });
  });
});
