import { Contribution } from './Contribution';
import { Record as Official } from './Official';

export type TermType = 'sen' | 'rep';
export enum Party {
  Democrat = 'Democrat',
  Republican = 'Republican',
  Independent = 'Independent',
}
export type BioguideId = string;
export type FecId = string;
export enum Chamber {
  Senate,
  House,
  Unknown,
}
export type Identifier = string;

export interface BioRecord {
  birthday: string;
  gender: string;
}

export interface ChannelRecord {
  id: string;
  type: string;
}

export interface IdRecord {
  bioguide: BioguideId;
  fec: Array<FecId>;
}

export interface NameRecord {
  first?: string;
  last?: string;
  official_full: string;
}

export interface TermRecord {
  type: TermType;
  start: string;
  end: string;
  state: string;
  district?: string;
  party: Party;
  phone: string;
}

export interface Record {
  id: IdRecord;
  identifier?: string;
  name: string | NameRecord;
  bio: BioRecord;
  channels: Array<ChannelRecord>;
  photoUrl?: string;
  terms: Array<TermRecord>;
}

/**
 * Remove accents and diacritic marks from the given string.
 * @param {string} str to clone without 'special' characters.
 * @returns `str` with the accents and diacritic characters replaced with their
 *    plain latin variants.
 */
function stripDiacritics(str: string) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

/**
 * Provides some convenience methods on top of the record for a legislator.
 */
export class Legislator implements Record {
  /**
   * Holds the Record used to retrieve data for getters.
   */
  private record: Record;

  /**
   * Get the legislator's identifier from the given `record`.
   * @param {Record | Official | Legislator} record that matches the `PropType`
   *    defined for `Legislator` instances.
   * @returns the identifier used for legislator records for the given `record`.
   */
  static getIdentifier(record: Record | Official | Legislator): Identifier {
    let identifier = undefined;
    if (record instanceof Legislator) {
      identifier = record.identifier;
    } else if (typeof record.name === 'string') {
      identifier = stripDiacritics(record.name);
    } else if (typeof record.name !== 'undefined') {
      identifier = stripDiacritics(record.name.official_full);
    } else {
      identifier = record.identifier || 'unknown';
    }
    return identifier;
  }

  /**
   * Retrieve the first contribution out of `contributions` that matches the identifier
   * of the given legislator.
   * @param {Array<ContributionRecord>} contributions records to be searched.
   * @param {Record|Legislator} legislator instance or record for which contributions
   *    will be searched.
   * @returns `-1` if no records from `contributions` match `legislator`, `amount`
   *    property of the contribution record otherwise.
   */
  static getContributionAmount(
    contributions: Array<Contribution>,
    legislator: Record | Legislator
  ): number {
    const id =
      legislator instanceof Legislator
        ? legislator.identifier
        : Legislator.getIdentifier(legislator);
    const contribution = contributions.find(
      record => record.legislatorId === id
    );
    if (contribution !== undefined) {
      return contribution.amount;
    } else {
      return -1;
    }
  }

  /**
   * Create a new Legislator instance from the data provided in the given
   * `record`.
   *
   *      {
   *        "terms": [
   *          {
   *            "type": "rep|sen",
   *            "start": "<date string>",
   *            "end": "<date string>",
   *            "state": "<US State abbreviation>",
   *            "party": "<US Political Party Name>",
   *          }
   *        ]
   *      }
   *
   * @param {Record} record containing data about the legislator.
   */
  constructor(record: Record) {
    this.record = record;
  }

  /**
   * Gets the biographical object for the instance.
   * @returns an object containing (at least) `birthday` and `gender` properties.
   */
  get bio(): BioRecord {
    return this.record.bio;
  }

  /**
   * Retrieve the bioguide property out of `record.id`.
   * @returns the bioguide id assigned to this legislator.
   */
  get bioguide(): BioguideId {
    return this.id.bioguide;
  }

  /**
   * Get the chamber of the legislator.
   * @returns 'house' if the legislator's current term is in the US House of
   *    Representatives; 'senate' if the legislator's current term is in the
   *    US Senate; 'unknown' otherwise.
   */
  get chamber(): Chamber {
    if (this.isSenator) {
      return Chamber.Senate;
    } else if (this.isRepresentative) {
      return Chamber.House;
    } else {
      return Chamber.Unknown;
    }
  }

  /**
   * Retrieve the channels from by which the legislator can be reached.
   * @returns an array of channels.
   */
  get channels(): Array<ChannelRecord> {
    return this.record.channels;
  }

  /**
   * Retrieve the most recent term object from the given record.
   * @returns a term record for the most recent (current) term.
   */
  get currentTerm(): TermRecord {
    const { terms } = this;
    const [currentTerm] = terms.slice(-1);
    return currentTerm;
  }

  /**
   * Retrieve the full, official name of the Legislator.
   * @returns full, official name.
   */
  get fullName(): string {
    return this.name.official_full;
  }

  /**
   * Retrieve the abbreviated gender of this legislator.
   * @returns the `gender` recorded for the legislator.
   */
  get gender(): string {
    return this.bio.gender;
  }

  /**
   * Retrieve a pronoun appropriate to the `gender` property.
   * @returns 'Them' if `gender` is anything other than 'M' or 'F'.
   */
  get genderPronoun(): string {
    switch (this.gender) {
      case 'M':
        return 'Him';
      case 'F':
        return 'Her';
      default:
        return 'Them';
    }
  }

  /**
   * Gets the id object for the instance.
   * @returns an object containing (at least) `fec` and `bioguide` properties.
   */
  get id(): IdRecord {
    return this.record.id;
  }

  /**
   * Uses `Legislator#getIdentifier(record)` using the record provided at
   * instance creation time.
   * @returns the identifier used for legislator records for the given `record`.
   */
  get identifier(): Identifier {
    return Legislator.getIdentifier(this.record);
  }

  /**
   * Whether or not the `currentTerm` reflects a US Senate term.
   * @returns `true` if the `currentTerm` exists and has a Senate type.
   */
  get isSenator(): boolean {
    return this.currentTerm !== undefined && this.currentTerm.type === 'sen';
  }

  /**
   * Whether or not the `currentTerm` reflects a US House of Representatives
   * term.
   * @returns `true` if the `currentTerm` exists and has a US House of
   *    Representatives type.
   */
  get isRepresentative(): boolean {
    return this.currentTerm !== undefined && this.currentTerm.type === 'rep';
  }

  /**
   * Gets the name object for the instance.
   * @returns an object containing (at least) the `official_full` property.
   */
  get name(): NameRecord {
    if (typeof this.record.name === 'string') {
      return { official_full: this.record.name };
    } else {
      return this.record.name;
    }
  }

  /**
   * Retrieves the US Political Party under which this legislator was elected
   * for their current term.
   * @returns current US Political Party.
   */
  get party(): Party {
    return this.currentTerm.party;
  }

  /**
   * Get the phone number associated with the current term.
   * @returns The phone number associated with the current term.
   */
  get phone(): string {
    return this.currentTerm.phone;
  }

  /**
   * Get the URL for the official bioguide photo.
   * @returns a URL on theunitedstates.io.
   */
  get photoUrl(): string {
    const bioguide = this.bioguide;
    const size = 'original';
    return `https://theunitedstates.io/images/congress/${size}/${bioguide}.jpg`;
  }

  /**
   * The US State abbreviation for the state this legislator represents.
   * @returns a US State abbreviation.
   */
  get state(): string {
    return this.currentTerm.state;
  }

  /**
   * Gets the array of terms for the instance.
   * @returns an array of term records containing (at least) one record.
   */
  get terms(): Array<TermRecord> {
    return this.record.terms;
  }

  /**
   * Get the Twitter handle of the legislator if it is provided.
   * @returns `undefined` if it isn't provided in `record`; the Twitter handle
   *    if it can be found in `record`.
   */
  get twitter(): string | undefined {
    const channels = this.record.channels || [];
    const channel = channels.find(c => c.type === 'Twitter');
    return channel === undefined ? undefined : channel.id;
  }
}

export default Legislator;
