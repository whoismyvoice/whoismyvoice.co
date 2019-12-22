import { OutgoingHttpHeaders } from 'http';
import { NowRequest, NowResponse } from '@now/node';
import { execute } from './_utils';

const DEFAULT_RESPONSE_HEADERS: OutgoingHttpHeaders = {
  'content-type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Accept-Encoding',
  'Access-Control-Allow-Methods': 'GET,OPTIONS',
};

const BASE_URL = 'https://www.googleapis.com/civicinfo/v2/representatives';
const GOOGLE_CIVIC_API_KEY = process.env.GOOGLE_CIVIC_API_KEY;

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

function isParameterMissing(param: string | string[] | undefined): boolean {
  return param === undefined || (Array.isArray(param) && param.length === 0);
}

async function getCivicInformation(request: NowRequest) {
  const { query } = request;
  const { address } = query;
  if (isParameterMissing(address)) {
    throw new Error('address must be provided.');
  }
  const configParams =
    'levels=country&roles=legislatorLowerBody&roles=legislatorUpperBody&includeOffices=true';
  const encodedAddress = encodeParameter('address', address);
  const params = `key=${GOOGLE_CIVIC_API_KEY}&${encodedAddress}&${configParams}`;
  const url = `${BASE_URL}?${params}`;
  return execute(url);
}

function handler(request: NowRequest, response: NowResponse) {
  switch (request.method) {
    case 'GET':
      getCivicInformation(request)
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
