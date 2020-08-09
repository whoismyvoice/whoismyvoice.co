import { OutgoingHttpHeaders } from 'http';
import { NowRequest, NowResponse } from '@now/node';
import { encodeParameter, execute, isEmpty } from './_utils';

const DEFAULT_RESPONSE_HEADERS: OutgoingHttpHeaders = {
  'content-type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Accept-Encoding',
  'Access-Control-Allow-Methods': 'GET,OPTIONS',
};

const BASE_URL = 'https://www.googleapis.com/civicinfo/v2/representatives';
const GOOGLE_CIVIC_API_KEY = process.env.GOOGLE_CIVIC_API_KEY;

async function getCivicInformation(request: NowRequest): Promise<string> {
  const { query } = request;
  const { address } = query;
  if (isEmpty(address)) {
    throw new Error('address must be provided.');
  } else if (GOOGLE_CIVIC_API_KEY === undefined) {
    throw new Error('GOOGLE_CIVIC_API_KEY must be defined in environment.');
  }
  const configParams =
    'levels=country&roles=legislatorLowerBody&roles=legislatorUpperBody&includeOffices=true';
  const encodedAddress = encodeParameter('address', address);
  const params = `key=${GOOGLE_CIVIC_API_KEY}&${encodedAddress}&${configParams}`;
  const url = `${BASE_URL}?${params}`;
  return execute(url);
}

function handler(request: NowRequest, response: NowResponse): void {
  switch (request.method) {
    case 'GET':
      getCivicInformation(request)
        .then((data) =>
          response.writeHead(200, DEFAULT_RESPONSE_HEADERS).end(data)
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
