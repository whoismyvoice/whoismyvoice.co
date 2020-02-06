import unfetch from 'isomorphic-unfetch';
import { compareElectionCycles, ElectionCycle } from '../models/ElectionCycle';
const fetch = unfetch;

async function fetchElectionCycles(): Promise<ElectionCycle[]> {
  const response = await fetch('/api/election-cycles');
  if (response.ok) {
    const cycles: ElectionCycle[] = await response.json();
    return cycles;
  } else {
    return [
      { year: '2020', label: '2019-2020' },
      { year: '2018', label: '2017-2018' },
    ];
  }
}

async function importElectionCycles(): Promise<ElectionCycle[]> {
  const cycles = await import('../election-cycles.json').then(
    cyclesData => cyclesData.data.election_cycles
  );
  return cycles
    .sort(compareElectionCycles)
    .slice(0, 2)
    .map(cycle => ({ year: cycle.ElectionCycle, label: cycle.label }));
}

export const ELECTION_CYCLES = importElectionCycles().catch(
  fetchElectionCycles
);
export const ELECTION_CYCLE = ELECTION_CYCLES.then(cycles =>
  cycles.map(cycle => cycle.year)
).then(years => years.join('|'));
export const ORGANIZATION = 'National Rifle Association';
export const ORGANIZATION_DISPLAY = 'the NRA';
