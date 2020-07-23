import { BioguideId } from './Legislator';

/**
 * Defines the type alias for a `Contribution` record.
 */
export interface Contribution {
  amount: number;
  legislatorId: BioguideId;
  organization: string;
}

/**
 * Defines a record representing a contribution from a specified sector.
 */
export interface SectorContribution {
  amount: number;
  sector: string;
  sectorCode: string;
}

/**
 * Associates a legislatorId with a list of `SectorContribution` records.
 */
export interface SectorContributions {
  legislatorId: string;
  contributions: SectorContribution[];
}
