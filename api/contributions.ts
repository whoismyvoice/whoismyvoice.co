import { OutgoingHttpHeaders } from 'http';
import { NowRequest, NowResponse } from '@now/node';
import { encodeParameter, execute, isEmpty } from './_utils';

const DEFAULT_RESPONSE_HEADERS: OutgoingHttpHeaders = {
  'content-type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Accept-Encoding',
  'Access-Control-Allow-Methods': 'GET,OPTIONS',
};

const BASE_URL = 'https://api.maplight.org/maplight-api/fec/contributions';

/* eslint-disable @typescript-eslint/camelcase */
async function getContributions(request: NowRequest): Promise<string> {
  const { query } = request;
  const { fecIds, cycle, organization } = query;
  if (isEmpty(fecIds)) {
    throw new Error('fecIds must be provided.');
  } else if (isEmpty(cycle)) {
    throw new Error('cycle must be provided.');
  } else if (isEmpty(organization)) {
    throw new Error('organization must be provided.');
  }
  const donor_organization = encodeParameter(
    'donor_organization',
    organization
  );
  const candidate_fecid = encodeParameter('candidate_fecid', fecIds);
  const election_cycle = encodeParameter('election_cycle', cycle);
  const params = `${election_cycle}&${candidate_fecid}&${donor_organization}`;
  const url = `${BASE_URL}?${params}`;
  return execute(url);
}
/* eslint-enable @typescript-eslint/camelcase */

function handler(request: NowRequest, response: NowResponse): void {
  switch (request.method) {
    case 'GET':
      getContributions(request)
        .then((data) =>
          response.writeHead(200, DEFAULT_RESPONSE_HEADERS).end(data)
        )
        .catch((err) =>
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
