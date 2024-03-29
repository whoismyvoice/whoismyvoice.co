import { Record as Official } from './Official';
import { isDefined } from '../util';

export type TermType = 'sen' | 'rep';
export enum Party {
  Democrat = 'Democrat',
  Republican = 'Republican',
  Independent = 'Independent',
}
export type BioguideId = string;
export type FecId = string;
export type OpenSecretsId = string;
export enum Chamber {
  Senate,
  House,
  Unknown,
}
export type Identifier = string;

export interface BioRecord {
  readonly birthday: string;
  readonly gender: string;
}

export interface ChannelRecord {
  readonly id: string;
  readonly type: string;
}

export interface IdRecord {
  readonly bioguide: BioguideId;
  readonly fec: Array<FecId>;
  readonly opensecrets: OpenSecretsId;
}

export interface CongressPerson {
  readonly districtId: string;
  readonly bioguideId: BioguideId;
}

export interface Senator {
  readonly state: string;
  readonly bioguideId: BioguideId;
}

export interface NameRecord {
  readonly first?: string;
  readonly last?: string;
  readonly middle?: string;
  readonly official_full?: string;
}

export interface TermRecord {
  readonly type: TermType;
  readonly start: string;
  readonly end: string;
  readonly state: string;
  readonly district?: string;
  readonly party: Party;
  readonly phone: string;
}

export interface Record {
  readonly id: IdRecord;
  readonly identifier?: string;
  readonly name: string | NameRecord;
  readonly bio: BioRecord;
  readonly channels: Array<ChannelRecord>;
  readonly photoUrl?: string;
  readonly terms: Array<TermRecord>;
}

const BIOGUIDE_PHOTO_REGEX = /.*\/([A-Z0-9]+)\.\w+$/;

/**
 * Extracts a bioguide id from the given bioguide photo url. The URL is
 * expected to be a url from http://bioguide.congress.gov like
 * http://bioguide.congress.gov/bioguide/photo/K/K000384.jpg where "K000384" is
 * the bioguide id.
 * @param photoUrl from which the id will be extracted.
 * @returns the extracted bioguide id.
 * @throws Error if no ide could be extracted.
 */
function extractBioguide(photoUrl: string): string {
  const result = BIOGUIDE_PHOTO_REGEX.exec(photoUrl);
  if (result !== null) {
    return result[1];
  } else {
    throw new Error(`Bioguide not able to be extracted from ${photoUrl}`);
  }
}

/**
 * Remove accents and diacritic marks from the given string.
 * @param {string} str to clone without 'special' characters.
 * @returns `str` with the accents and diacritic characters replaced with their
 *    plain latin variants.
 */
function normalizeForIdentifier(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[ .,]/g, '')
    .toLowerCase();
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
   * Get the legislator's bioguide identifier from the given `record`.
   * @param record from which the bioguide will be extracted.
   * @returns the bioguide identifier.
   */
  static getBioguideId(record: Record | Official | Legislator): Identifier {
    if (record instanceof Legislator) {
      return record.bioguide;
    } else if ('id' in record) {
      return record.id.bioguide;
    } else if (typeof record.photoUrl !== 'undefined') {
      return extractBioguide(record.photoUrl);
    } else {
      throw new Error('Unable to determine bioguide');
    }
  }

  /**
   * Retrieve the full, official name of the Legislator associated with `NameRecord`.
   * @param record holding name values for an official or legislator.
   * @returns full, official name.
   */
  static getFullName(record: NameRecord): Identifier {
    return typeof record.official_full !== 'undefined'
      ? record.official_full
      : [record.first, record.middle, record.last].filter(isDefined).join(' ');
  }

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
      identifier = normalizeForIdentifier(record.name);
    } else if (typeof record.name !== 'undefined') {
      identifier = normalizeForIdentifier(Legislator.getFullName(record.name));
    } else {
      identifier = record.identifier || 'unknown';
    }
    return identifier;
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
    return Legislator.getFullName(this.name);
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
    const channel = channels.find((c) => c.type === 'Twitter');
    return channel === undefined ? undefined : channel.id;
  }
}

export default Legislator;
