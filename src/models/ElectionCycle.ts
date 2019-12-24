export interface ElectionCycle {
  year: string;
  label: string;
}

interface ResponseElectionCycle {
  ElectionCycle: string;
  label: string;
}

export function compareElectionCycles(
  c1: ResponseElectionCycle,
  c2: ResponseElectionCycle
) {
  if (c1.ElectionCycle > c2.ElectionCycle) {
    return 1;
  } else if (c1.ElectionCycle < c2.ElectionCycle) {
    return -1;
  } else {
    return 0;
  }
}
