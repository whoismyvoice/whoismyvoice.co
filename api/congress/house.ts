import { OutgoingHttpHeaders } from 'http';
import { NowRequest, NowResponse } from '@vercel/node';
import { request as fetch } from '../_utils';

const DEFAULT_RESPONSE_HEADERS: OutgoingHttpHeaders = {
  'content-type': 'text/xml',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Accept-Encoding',
  'Access-Control-Allow-Methods': 'GET,OPTIONS',
};

const HEADERS_TO_REMOVE = [
  'content-security-policy',
  'x-content-security-policy',
  'vary',
];

const BASE_URL = 'https://clerk.house.gov/xml/lists/MemberData.xml';

/**
 * Dispatch the necessary details of `request` to the appropriate handling
 * function and combine response headers with the defaults.
 * @param request containing candidate information.
 * @param response to which data will be written.
 */
function handler(request: NowRequest, response: NowResponse): void {
  switch (request.method) {
    case 'GET':
      fetch(BASE_URL, 'text/xml')
        .then((res) => {
          const responseHeaders = res.headers;
          HEADERS_TO_REMOVE.forEach((header) => {
            delete responseHeaders[header];
          });
          const headers: OutgoingHttpHeaders = {
            'Cache-Control': 'public, max-age=86400, must-revalidate',
            ...responseHeaders,
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
