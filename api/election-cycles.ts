import { OutgoingHttpHeaders } from 'http';
import { NowRequest, NowResponse } from '@vercel/node';
import { execute } from './_utils';

/** Copied from `src/models/ElectionCycle.ts` */
interface ResponseElectionCycle {
  ElectionCycle: string;
  label: string;
}

/** Copied from `src/models/ElectionCycle.ts` */
interface ElectionCycle {
  year: string;
  label: string;
}

/**
 * Expected shape of the response from maplight API.
 * @see https://api.maplight.org/maplight-api/fec/election_cycles
 */
interface ElectionCyclesResponse {
  data: {
    election_cycles: ResponseElectionCycle[];
  };
}

const DEFAULT_RESPONSE_HEADERS: OutgoingHttpHeaders = {
  'content-type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Accept-Encoding',
  'Access-Control-Allow-Methods': 'GET,OPTIONS',
};

const BASE_URL = 'https://api.maplight.org/maplight-api/fec/election_cycles';

/** Copied from `src/models/ElectionCycle.ts` */
function compareCycles(
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

async function getElectionCycles(): Promise<ElectionCycle[]> {
  const url = `${BASE_URL}`;
  const result = await execute(url);
  const responseData: ElectionCyclesResponse = JSON.parse(result);
  /* See https://api.maplight.org/maplight-api/fec/election_cycles */
  const cycles: ResponseElectionCycle[] = responseData.data.election_cycles;
  return cycles
    .sort(compareCycles)
    .slice(0, 2)
    .map((cycle) => ({ year: cycle.ElectionCycle, label: cycle.label }));
}

function handler(request: NowRequest, response: NowResponse): void {
  switch (request.method) {
    case 'GET':
      getElectionCycles()
        .then((cycles) =>
          response
            .writeHead(200, DEFAULT_RESPONSE_HEADERS)
            .end(JSON.stringify(cycles))
        )
        .catch((err: Error) =>
          response
            .writeHead(500, DEFAULT_RESPONSE_HEADERS)
            .end(JSON.stringify({ error: err.message }))
        );
      break;
    case 'OPTIONS':
      response.writeHead(200, DEFAULT_RESPONSE_HEADERS).end();
      break;
    default:
      response.writeHead(405, DEFAULT_RESPONSE_HEADERS).end();
  }
}

export default handler;
