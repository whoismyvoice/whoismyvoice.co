import { BioguideId } from './Legislator';

/**
 * Defines the type alias for a `Contribution` record.
 */
export interface Contribution {
  readonly amount: number;
  readonly legislatorId: BioguideId;
  readonly organization: string;
}

/**
 * Defines a record representing a contribution from a specified sector.
 */
export interface SectorContribution {
  readonly amount: number;
  readonly sector: string;
  readonly sectorCode: string;
}

/**
 * Associates a legislatorId with a list of `SectorContribution` records.
 */
export interface SectorContributions {
  readonly legislatorId: string;
  readonly contributions: Readonly<SectorContribution[]>;
}
