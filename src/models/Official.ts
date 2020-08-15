import { ChannelRecord } from './Legislator';

/**
 * Type definition for the address in Google Civic Information API.
 */
interface AddressRecord {
  readonly line1: string;
  readonly line2?: string;
  readonly city: string;
  readonly state: string;
  readonly zip: string;
}

/**
 * Type definition for the results of Google Civic Information API.
 */
export interface Record {
  readonly name: string;
  readonly address?: Array<AddressRecord>;
  readonly identifier?: string;
  readonly party?: string;
  readonly phones?: Array<string>;
  readonly urls?: Array<string>;
  readonly photoUrl?: string;
  readonly channels: Array<ChannelRecord>;
}
