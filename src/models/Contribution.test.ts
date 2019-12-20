import { Contribution } from './Contribution';
import { Legislator } from './Legislator';
import { createLegislator } from './Legislator.test';

export function createContribution(
  legislatorId: string = 'John Smith',
  organization: string = 'SuperPAC',
  amount: number = 1000
): Contribution {
  const legislator = new Legislator(createLegislator(legislatorId));
  return {
    amount,
    legislatorId: legislator.identifier,
    organization,
  };
}

// Suite fails if a test isn't defined
it.skip('does a thing', () => undefined);
