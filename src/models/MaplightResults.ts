/**
 * The type for an aggregate total record in `MaplightResults` record.
 */
interface AggregateTotal {
  contributions: number;
  total_amount: number;
}

/**
 * Defines the type alias for a `MaplightResults` record.
 */
export interface MaplightResultsRecord {
  search_terms: {
    candidate_fec_id: string;
    donor: {
      donor_organization: string;
    };
    election_cycle: string;
  };
  data: {
    aggregate_totals: Array<AggregateTotal>;
  };
}
