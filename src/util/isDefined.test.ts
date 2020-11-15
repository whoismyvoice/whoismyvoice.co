import { isDefined } from './isDefined';

describe(isDefined, () => {
  it('is true for an object', () => {
    expect(isDefined({})).toBe(true);
  });

  it('is false for undefined & null', () => {
    expect(isDefined(undefined)).toBe(false);
    expect(isDefined(null)).toBe(false);
  });
});
