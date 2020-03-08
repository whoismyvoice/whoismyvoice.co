import { OutgoingHttpHeaders } from 'http';
import { NowRequest, NowResponse } from '@now/node';
import { execute } from './_utils';

const DEFAULT_RESPONSE_HEADERS: OutgoingHttpHeaders = {
  'content-type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Accept-Encoding',
  'Access-Control-Allow-Methods': 'GET,OPTIONS',
};

const BASE_URL = 'https://api.maplight.org/maplight-api/fec/contributions';

/**
 * Encode a parameter as a URI component. If `value` is an array then encode
 * them all and join them together.
 * @param key to use for the parameter the URI component.
 * @param value to be encoded.
 * @returns key and value(s) as a query parameter.
 */
function encodeParameter(key: string, value: string | string[]): string {
  const values = typeof value === 'string' ? [value] : value;
  return values.map(value => `${key}=${encodeURIComponent(value)}`).join('&');
}

function isParameterMissing(param: string | string[] | undefined): boolean {
  return param === undefined || (Array.isArray(param) && param.length === 0);
}

/* eslint-disable @typescript-eslint/camelcase */
async function getContributions(request: NowRequest): Promise<string> {
  const { query } = request;
  const { fecIds, cycle, organization } = query;
  if (isParameterMissing(fecIds)) {
    throw new Error('fecIds must be provided.');
  } else if (isParameterMissing(cycle)) {
    throw new Error('cycle must be provided.');
  } else if (isParameterMissing(organization)) {
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
        .then(data =>
          response.writeHead(200, DEFAULT_RESPONSE_HEADERS).end(data)
        )
        .catch(err =>
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
