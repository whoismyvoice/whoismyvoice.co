import { OutgoingHttpHeaders } from 'http';
import { NowRequest, NowResponse } from '@vercel/node';
import {
  encodeParameter,
  isEmpty,
  request as fetch,
  Response,
} from '../_utils';

const DEFAULT_RESPONSE_HEADERS: OutgoingHttpHeaders = {
  'content-type': 'text/xml',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Accept-Encoding',
  'Access-Control-Allow-Methods': 'GET,OPTIONS',
};

const BASE_URL = 'https://www.opensecrets.org/api/';
const METHOD = 'candSector';
const OPEN_SECRETS_API_KEY = process.env.OPEN_SECRETS_API_KEY;

async function getContributions(request: NowRequest): Promise<Response> {
  const { query } = request;
  const { cycle, id } = query;
  if (isEmpty(id)) {
    throw new Error('id must be provided.');
  } else if (isEmpty(cycle)) {
    throw new Error('cycle must be provided.');
  } else if (OPEN_SECRETS_API_KEY === undefined) {
    throw new Error('OpenSecrets API key must be set.');
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
        .then((res) => {
          const headers: OutgoingHttpHeaders = {
            ...res.headers,
            ...DEFAULT_RESPONSE_HEADERS,
          };
          response.writeHead(200, headers).end(res.body);
        })
        .catch((err: Error) => {
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
