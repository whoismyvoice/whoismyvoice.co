import { OutgoingHttpHeaders } from 'http';
import { get as fetch } from 'https';
import { NowRequest, NowResponse } from '@now/node';

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
function encodeParameter(key: string, value: string | string[]) {
  const values = typeof value === 'string' ? [value] : value;
  return values.map(value => `${key}=${encodeURIComponent(value)}`).join('&');
}

function execute(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const req = fetch(url, res => {
      const statusCode = res.statusCode;
      const contentType = res.headers['content-type'];
      let error: Error;
      if (statusCode !== 200) {
        error = new Error(
          `Upstream request failed.\nReceived status code of ${statusCode}`
        );
      } else if (!/^application\/json/.test(contentType)) {
        error = new Error(
          `Invalid content-type.\nExpected application/json but received ${contentType}`
        );
      }
      if (error) {
        // consume response data to free up memory
        res.resume();
        reject(error);
      } else {
        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', chunk => (rawData += chunk));
        res.on('end', () => {
          try {
            resolve(rawData);
          } catch (e) {
            reject(e);
          }
        });
      }
    });
    req.on('error', e => reject(e));
  });
}

function isParameterMissing(param: string | string[] | undefined): boolean {
  return param === undefined || (Array.isArray(param) && param.length === 0);
}

async function getContributions(request: NowRequest) {
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

function handler(request: NowRequest, response: NowResponse) {
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
