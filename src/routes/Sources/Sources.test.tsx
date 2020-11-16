import React from 'react';
import { render } from '@testing-library/react';
import { ElectionCycle } from '../../models/ElectionCycle';
import { Sources } from './Sources';

const cycles: ElectionCycle[] = [
  { year: '2018', label: '2017-2018' },
  { year: '2020', label: '2019-2020' },
];

describe('Sources', () => {
  it('renders the page', () => {
    const { container, getByText } = render(<Sources cycles={cycles} />);
    const block = container.querySelector('.page-block');
    expect(block).not.toBeNull();
    expect(getByText('Sources').tagName).toMatch(/h2/i);
    expect(
      getByText('OpenSecrets and the Center for Responsive Politics').tagName
    ).toMatch(/a/i);
    expect(getByText('Google Civic Information API').tagName).toMatch(/a/i);
    expect(getByText('the @unitedstates project').tagName).toMatch(/a/i);
    expect(
      getByText('political spending reaches record numbers').tagName
    ).toMatch(/a/i);
    expect(getByText('For More Information on Gun Violence').tagName).toMatch(
      /h3/i
    );
    expect(
      getByText('2017-2018 and 2019-2020 election cycles', { exact: false })
    ).not.toBeNull();
  });
});
