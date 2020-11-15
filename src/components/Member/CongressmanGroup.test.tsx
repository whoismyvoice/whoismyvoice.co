import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import CongressmanGroup from './CongressmanGroup';
import { createLegislator } from '../../models/Legislator.test';
import { Legislator } from '../../models/Legislator';

const baseProps = {
  allLegislators: [],
  legislators: [],
  sectorContributions: {},
};

it('renders without crashing', () => {
  const { container } = render(<CongressmanGroup {...baseProps} />);
  expect(container).toBeInTheDocument();
});

it('renders correctly without a legislator', () => {
  const props = {
    ...baseProps,
  };
  const { container } = render(<CongressmanGroup {...props} />);
  const wrapper = container.querySelector('.member-wrapper');
  expect(wrapper).toBeInTheDocument();
  expect(wrapper?.querySelectorAll('.member-container').length).toBe(0);
});

it('renders correctly with a legislator', () => {
  const props = {
    ...baseProps,
    legislators: [new Legislator(createLegislator('John Smith'))],
  };
  const { container, getByText } = render(<CongressmanGroup {...props} />);
  const wrapper = container.querySelector('.member-wrapper');
  expect(wrapper).toBeInTheDocument();
  expect(wrapper?.querySelectorAll('.member-container').length).toBe(
    props.legislators.length
  );
  expect(wrapper?.querySelectorAll('.member-img').length).toBe(
    props.legislators.length
  );
  expect(wrapper?.querySelectorAll('.ribbon-wrapper').length).toBe(
    props.legislators.length
  );
  expect(wrapper?.querySelectorAll('.member__payment').length).toBe(
    props.legislators.length
  );
  expect(wrapper?.querySelectorAll('.payments--graph').length).toBe(
    props.legislators.length
  );
  expect(
    getByText(`Contact ${props.legislators[0].genderPronoun}`)
  ).toBeInTheDocument();
});

it('renders correctly with a legislator and contribution', () => {
  const legislator = new Legislator(createLegislator('John Smith'));
  const props = {
    ...baseProps,
    legislators: [legislator],
    sectorContributions: {
      [legislator.bioguide]: {
        legislatorId: legislator.bioguide,
        contributions: [
          {
            amount: 1500,
            sector: 'Foo',
            sectorCode: 'F',
          },
        ],
      },
    },
  };
  const { container, getByText } = render(<CongressmanGroup {...props} />);
  const wrapper = container.querySelector('.member-wrapper');
  expect(wrapper).toBeInTheDocument();
  expect(wrapper?.querySelectorAll('.member-container').length).toBe(
    props.legislators.length
  );
  expect(wrapper?.querySelectorAll('.member-img').length).toBe(
    props.legislators.length
  );
  expect(wrapper?.querySelectorAll('.ribbon-wrapper').length).toBe(
    props.legislators.length
  );
  expect(wrapper?.querySelectorAll('.member__payment').length).toBe(
    props.legislators.length
  );
  expect(wrapper?.querySelectorAll('.payments--graph').length).toBe(
    props.legislators.length
  );
  expect(
    getByText(`Contact ${props.legislators[0].genderPronoun}`)
  ).toBeInTheDocument();
});
