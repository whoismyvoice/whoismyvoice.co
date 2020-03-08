import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { MemberResultsTitle, getMemberType } from './MemberResultsTitle';
import { createLegislator, createTerm } from '../../models/Legislator.test';
import { Legislator, TermRecord } from '../../models/Legislator';

jest.mock('mixpanel-browser');

function createLegislatorWithTerm(
  name: string,
  terms: Array<TermRecord>
): Legislator {
  const record = createLegislator(name);
  return new Legislator({
    ...record,
    terms,
  });
}

describe(getMemberType, () => {
  describe('empty legislators', () => {
    const legislators: Array<Legislator> = [];

    it('throws an error', () => {
      expect(getMemberType.bind(legislators, legislators)).toThrow(Error);
    });
  });

  describe('single legislator', () => {
    it('is senator', () => {
      const legislators = [
        createLegislatorWithTerm('John Smith', [createTerm('sen')]),
      ];
      expect(getMemberType(legislators)).toBe('Senator');
    });

    it('is rep', () => {
      const legislators = [
        createLegislatorWithTerm('John Smith', [createTerm('rep')]),
      ];
      expect(getMemberType(legislators)).toBe('Representative');
    });
  });

  describe('two legeslators', () => {
    it('is senators', () => {
      const legislators = [
        createLegislatorWithTerm('John Smith', [createTerm('sen')]),
        createLegislatorWithTerm('John Smith Jr.', [createTerm('sen')]),
      ];
      expect(getMemberType(legislators)).toBe('Senators');
    });

    it('is senator & rep', () => {
      const legislators = [
        createLegislatorWithTerm('John Smith', [createTerm('sen')]),
        createLegislatorWithTerm('John Smith Jr.', [createTerm('rep')]),
      ];
      expect(getMemberType(legislators)).toBe('Senator & Representative');
    });

    it('is rep & senator', () => {
      const legislators = [
        createLegislatorWithTerm('John Smith', [createTerm('rep')]),
        createLegislatorWithTerm('John Smith Jr.', [createTerm('sen')]),
      ];
      expect(getMemberType(legislators)).toBe('Representative & Senator');
    });
  });

  describe('three legeslators', () => {
    it('is senators & rep', () => {
      const legislators = [
        createLegislatorWithTerm('John Smith', [createTerm('sen')]),
        createLegislatorWithTerm('John Smith Jr.', [createTerm('sen')]),
        createLegislatorWithTerm('John Smith III', [createTerm('rep')]),
      ];
      expect(getMemberType(legislators)).toBe('Senators & Representative');
    });
  });

  describe('more legeslators', () => {
    it('is senators & rep', () => {
      const legislators = [
        createLegislatorWithTerm('John Smith', [createTerm('sen')]),
        createLegislatorWithTerm('John Smith Jr.', [createTerm('sen')]),
        createLegislatorWithTerm('John Smith III', [createTerm('rep')]),
        createLegislatorWithTerm('John Smith IV', [createTerm('rep')]),
      ];
      expect(getMemberType.bind(legislators, legislators)).toThrow(Error);
    });
  });
});

describe('MemberResultsTitle', () => {
  describe('single legislator', () => {
    it('is senator', () => {
      const legislators = [
        createLegislatorWithTerm('John Smith', [createTerm('sen')]),
      ];
      const props = { legislators };
      const tree = renderer.create(<MemberResultsTitle {...props} />).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('is rep', () => {
      const legislators = [
        createLegislatorWithTerm('John Smith', [createTerm('rep')]),
      ];
      const props = { legislators };
      const tree = renderer.create(<MemberResultsTitle {...props} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('two legislators', () => {
    it('is senators', () => {
      const legislators = [
        createLegislatorWithTerm('John Smith', [createTerm('sen')]),
        createLegislatorWithTerm('John Smith Jr.', [createTerm('sen')]),
      ];
      const props = { legislators };
      const tree = renderer.create(<MemberResultsTitle {...props} />).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('is senator & rep', () => {
      const legislators = [
        createLegislatorWithTerm('John Smith', [createTerm('sen')]),
        createLegislatorWithTerm('John Smith Jr.', [createTerm('rep')]),
      ];
      const props = { legislators };
      const tree = renderer.create(<MemberResultsTitle {...props} />).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('is rep & senator', () => {
      const legislators = [
        createLegislatorWithTerm('John Smith', [createTerm('rep')]),
        createLegislatorWithTerm('John Smith Jr.', [createTerm('sen')]),
      ];
      const props = { legislators };
      const tree = renderer.create(<MemberResultsTitle {...props} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('three legeslators', () => {
    it('is senators & rep', () => {
      const legislators = [
        createLegislatorWithTerm('John Smith', [createTerm('sen')]),
        createLegislatorWithTerm('John Smith Jr.', [createTerm('sen')]),
        createLegislatorWithTerm('John Smith III', [createTerm('rep')]),
      ];
      const props = { legislators };
      const tree = renderer.create(<MemberResultsTitle {...props} />).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
