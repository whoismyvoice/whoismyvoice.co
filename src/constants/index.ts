import unfetch from 'isomorphic-unfetch';
import { ElectionCycle } from '../models/ElectionCycle';
const fetch = unfetch;

async function fetchElectionCycles() {
  const response = await fetch('/api/election-cycles');
  if (response.ok) {
    const cycles: ElectionCycle[] = await response.json();
    return cycles;
  } else {
    return [
      { year: '2018', label: '2017-2018' },
      { year: '2020', label: '2019-2020' },
    ];
  }
}

export const ELECTION_CYCLES = fetchElectionCycles();
export const ELECTION_CYCLE = ELECTION_CYCLES.then(cycles =>
  cycles.map(cycle => cycle.year)
).then(years => years.join('|'));
export const ORGANIZATION = 'National Rifle Association';
export const ORGANIZATION_DISPLAY = 'the NRA';
