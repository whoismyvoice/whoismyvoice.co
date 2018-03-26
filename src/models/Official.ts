import { ChannelRecord } from './Legislator';

/**
 * Type definition for the address in Google Civic Information API.
 */
interface AddressRecord {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
}

/**
 * Type definition for the results of Google Civic Information API.
 */
export interface Record {
  name: string;
  address?: Array<AddressRecord>;
  party?: string;
  phones?: Array<string>;
  urls?: Array<string>;
  photoUrl?: string;
  channels: Array<ChannelRecord>;
}
