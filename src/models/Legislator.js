// @flow

import PropTypes from 'prop-types';
import { PropType as ContributionType } from './Contribution';

// Types
import type { ContributionRecord } from './Contribution';

export type BioguideId = string;
export type FecId = string;
opaque type LegislatorChamber = 'senate' | 'house' | 'unknown';
export type LegislatorIdentifier = string;

type LegislatorBioRecord = {
  birthday: string,
  gender: string,
};

export type LegislatorChannelRecord = {
  id: string,
  type: string,
};

type LegislatorIdRecord = {
  bioguide: BioguideId,
  fec: Array<FecId>,
};

type LegislatorNameRecord = {
  first?: string,
  last?: string,
  official_full: string,
};

type LegislatorTermRecord = {
  type: string,
  start: string,
  end: string,
  state: string,
  district?: string,
  party: string,
  phone: string,
};

export type LegislatorRecord = {
  id: LegislatorIdRecord,
  identifier?: string,
  name: string | LegislatorNameRecord,
  bio: LegislatorBioRecord,
  channels: Array<LegislatorChannelRecord>,
  photoUrl?: string,
  terms: Array<LegislatorTermRecord>,
};

/**
 * Defines the `PropTypes` validation structure for a `Legislator` record.
 */
export const PropType = PropTypes.shape({
  id: PropTypes.shape({
    bioguide: PropTypes.string,
    fec: PropTypes.arrayOf(PropTypes.string),
  }),
  identifier: PropTypes.string,
  name: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      first: PropTypes.string,
      last: PropTypes.string,
      official_full: PropTypes.string.isRequired,
    }),
  ]),
  bio: PropTypes.shape({
    birthday: PropTypes.string,
    gender: PropTypes.string,
  }),
  channels: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      type: PropTypes.string,
    })
  ),
  photoUrl: PropTypes.string,
  terms: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      start: PropTypes.string.isRequired,
      end: PropTypes.string.isRequired,
      state: PropTypes.string,
      district: PropTypes.number,
      party: PropTypes.string,
    })
  ),
});

/**
 * Remove accents and diacritic marks from the given string.
 * @param {string} str to clone without 'special' characters.
 * @returns `str` with the accents and diacritic characters replaced with their
 *    plain latin variants.
 */
function stripDiacritics(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

/**
 * Provides some convenience methods on top of the record for a legislator.
 */
export class Legislator {
  /**
   * Get the legislator's identifier from the given `record`.
   * @param {LegislatorRecord} record that matches the `PropType` defined for
   *    `Legislator` instances.
   * @returns the identifier used for legislator records for the given `record`.
   */
  static getIdentifier(record: LegislatorRecord): LegislatorIdentifier {
    PropTypes.checkPropTypes(
      { record: PropType },
      { record },
      'record',
      'Legislator#getIdentifier'
    );
    let identifier = undefined;
    if (record.identifier !== undefined) {
      identifier = record.identifier;
    } else if (typeof record.name === 'string') {
      identifier = stripDiacritics(record.name);
    } else {
      identifier = stripDiacritics(record.name.official_full);
    }
    return identifier;
  }

  /**
   * Retrieve the first contribution out of `contributions` that matches the identifier
   * of the given legislator.
   * @param {Array<ContributionRecord>} contributions records to be searched.
   * @param {LegislatorRecord|Legislator} legislator instance or record for which contributions
   *    will be searched.
   * @returns `-1` if no records from `contributions` match `legislator`, `amount`
   *    property of the contribution record otherwise.
   */
  static getContributionAmount(
    contributions: Array<ContributionRecord>,
    legislator: LegislatorRecord | Legislator
  ): number {
    PropTypes.checkPropTypes(
      { contributions: PropTypes.arrayOf(ContributionType) },
      { contributions },
      'contributions',
      'Legislator#getContributionAmount'
    );
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

  record: LegislatorRecord;

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
   * @param {LegislatorRecord} record containing data about the legislator.
   */
  constructor(record: LegislatorRecord) {
    PropTypes.checkPropTypes(
      { record: PropType },
      { record },
      'record',
      'Legislator'
    );
    this.record = record;
  }

  /**
   * Gets the biographical object for the instance.
   * @returns an object containing (at least) `birthday` and `gender` properties.
   */
  get bio(): LegislatorBioRecord {
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
  get chamber(): LegislatorChamber {
    if (this.isSenator) {
      return 'senate';
    } else if (this.isRepresentative) {
      return 'house';
    } else {
      return 'unknown';
    }
  }

  /**
   * Retrieve the most recent term object from the given record.
   * @returns a term record for the most recent (current) term.
   */
  get currentTerm(): LegislatorTermRecord {
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
  get id(): LegislatorIdRecord {
    return this.record.id;
  }

  /**
   * Uses `Legislator#getIdentifier(record)` using the record provided at
   * instance creation time.
   * @returns the identifier used for legislator records for the given `record`.
   */
  get identifier(): LegislatorIdentifier {
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
  get name(): LegislatorNameRecord {
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
  get party(): string {
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
  get terms(): Array<LegislatorTermRecord> {
    return this.record.terms;
  }

  /**
   * Get the Twitter handle of the legislator if it is provided.
   * @returns `undefined` if it isn't provided in `record`; the Twitter handle
   *    if it can be found in `record`.
   */
  get twitter(): ?string {
    const channels = this.record.channels || [];
    const channel = channels.find(channel => channel.type === 'Twitter');
    return channel === undefined ? undefined : channel.id;
  }
}

export default Legislator;
