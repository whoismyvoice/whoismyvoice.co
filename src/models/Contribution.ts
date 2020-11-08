import { BioguideId } from './Legislator';

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
  readonly legislatorId: BioguideId;
  readonly contributions: Readonly<SectorContribution[]>;
}
