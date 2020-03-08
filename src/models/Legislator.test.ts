import { Record, TermRecord, TermType, Legislator, Party } from './Legislator';

export function createTerm(type: TermType = 'sen'): TermRecord {
  return {
    type,
    start: '2017-03-03',
    end: '2017-03-03',
    state: 'NY',
    party: Party.Independent,
    phone: '123-123-1234',
  };
}

export function createLegislator(name: string, photoUrl?: string): Record {
  return {
    bio: {
      birthday: '',
      gender: '',
    },
    channels: [],
    id: {
      bioguide: '',
      fec: [],
    },
    name: {
      // eslint-disable-next-line @typescript-eslint/camelcase
      official_full: name,
    },
    photoUrl,
    terms: [createTerm()],
  };
}

it('creates an instance', () => {
  const instance = new Legislator(createLegislator('John Smith'));
  expect(instance).toBeInstanceOf(Legislator);
});
