var React = require('react');
var TestUtils = require('react/lib/ReactTestUtils');
var MemberList = require('../../src/components/App.js');

describe('MemberList', () => {
  it('renders', () => {
    var element = TestUtils.renderIntoDocument(<MemberList />);
    expect(element).toBeTruthy();
  });
});
