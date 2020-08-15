export interface ElectionCycle {
  readonly year: string;
  readonly label: string;
}

interface ResponseElectionCycle {
  readonly ElectionCycle: string;
  readonly label: string;
}

export function compareElectionCycles(
  c1: ResponseElectionCycle,
  c2: ResponseElectionCycle
): number {
  if (c1.ElectionCycle > c2.ElectionCycle) {
    return -1;
  } else if (c1.ElectionCycle < c2.ElectionCycle) {
    return 1;
  } else {
    return 0;
  }
}
