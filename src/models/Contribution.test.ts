import { Contribution } from './Contribution';

export function createContribution(
  legislatorId: string = 'John Smith',
  organization: string = 'SuperPAC',
  amount: number = 1000
): Contribution {
  return {
    amount,
    legislatorId,
    organization,
  };
}

// Suite fails if a test isn't defined
it.skip('does a thing', () => undefined);
