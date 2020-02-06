import { OutgoingHttpHeaders } from 'http';
import { NowRequest, NowResponse } from '@now/node';
import { request as fetch, Response } from '../_utils';

const DEFAULT_RESPONSE_HEADERS: OutgoingHttpHeaders = {
  'content-type': 'text/xml',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Accept-Encoding',
  'Access-Control-Allow-Methods': 'GET,OPTIONS',
};

const BASE_URL = 'https://www.opensecrets.org/api/';
const METHOD = 'candSector';
const OPEN_SECRETS_API_KEY = process.env.OPEN_SECRETS_API_KEY;

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

/**
 * Determine if `param` constitutes a valid value for a required parameter.
 * @param param value to test
 * @return `true` if the parameter value is valid, `false` otherwise.
 */
function isParameterMissing(param: string | string[] | undefined): boolean {
  return param === undefined || (Array.isArray(param) && param.length === 0);
}

async function getContributions(request: NowRequest): Promise<Response> {
  const { query } = request;
  const { cycle, id } = query;
  if (isParameterMissing(id)) {
    throw new Error('id must be provided.');
  } else if (isParameterMissing(cycle)) {
    throw new Error('cycle must be provided.');
  }
  const apiKey = `apikey=${OPEN_SECRETS_API_KEY}`;
  const candidateId = encodeParameter('cid', id);
  const apiMethod = encodeParameter('method', METHOD);
  const params = `${apiMethod}&${apiKey}&${candidateId}`;
  const url = `${BASE_URL}?${params}`;
  return fetch(url, 'text/xml');
}

/**
 * Dispatch the necessary details of `request` to the appropriate handling
 * function and combine response headers with the defaults.
 * @param request containing candidate information.
 * @param response to which data will be written.
 */
function handler(request: NowRequest, response: NowResponse): void {
  switch (request.method) {
    case 'GET':
      getContributions(request)
        .then(res => {
          const headers: OutgoingHttpHeaders = {
            ...res.headers,
            ...DEFAULT_RESPONSE_HEADERS,
          };
          response.writeHead(200, headers).end(res.body);
        })
        .catch(err => {
          const headers: OutgoingHttpHeaders = {
            ...DEFAULT_RESPONSE_HEADERS,
            'content-type': 'application/json',
          };
          response
            .writeHead(500, headers)
            .end(JSON.stringify({ error: err.message }));
        });
      break;
    case 'OPTIONS':
      response.writeHead(200, DEFAULT_RESPONSE_HEADERS).end();
      break;
    default:
      response.writeHead(405, DEFAULT_RESPONSE_HEADERS).end();
  }
}

export default handler;
