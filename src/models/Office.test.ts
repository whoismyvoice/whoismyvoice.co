import { Office, Record } from './Office';

export function createCivicOfficeRecord(divisionId: string): Record {
  return {
    divisionId,
    levels: ['country'],
    roles: ['legislatorLowerBody'],
    name: '',
  };
}

describe(Office, () => {
  describe('divisionId for non legislative office', () => {
    const office = new Office({
      name: 'President of the United States',
      divisionId: 'ocd-division/country:us',
      levels: ['country'],
      roles: ['headOfState', 'headOfGovernment'],
    });
    it('Creates an instance', () => {
      expect(office).toBeInstanceOf(Office);
    });
    it('has no state', () => {
      expect(office.state).toBeUndefined();
    });
    it('has no district', () => {
      expect(office.congressionalDistrict).toBeUndefined();
    });
    it('has id of divisionId', () => {
      expect(office.id).toEqual('ocd-division/country:us');
    });
  });

  describe('divisionId w/o district', () => {
    const office = new Office({
      name: 'U.S. Senator',
      divisionId: 'ocd-division/country:us/state:wi',
      levels: ['country'],
      roles: ['legislatorUpperBody'],
    });
    it('Creates an instance', () => {
      expect(office).toBeInstanceOf(Office);
    });
    it('has a state', () => {
      expect(office.state).toEqual('WI');
    });
    it('does not have a district', () => {
      expect(office.congressionalDistrict).toBeUndefined();
    });
    it('has id === state', () => {
      expect(office.id).toEqual('WI');
    });
  });

  describe('divisionId w/ district', () => {
    const office = new Office({
      name: 'U.S. Representative',
      divisionId: 'ocd-division/country:us/state:wi/cd:7',
      levels: ['country'],
      roles: ['legislatorLowerBody'],
    });
    it('Creates an instance', () => {
      expect(office).toBeInstanceOf(Office);
    });
    it('has a state', () => {
      expect(office.state).toEqual('WI');
    });
    it('has a district', () => {
      expect(office.congressionalDistrict).toEqual('07');
    });
    it('has id comprised of state and district', () => {
      expect(office.id).toEqual('WI07');
    });
  });
});
