import { get as fetch } from 'https';
import { IncomingHttpHeaders } from 'http';

/**
 * The collected result of retrieving HTTP data.
 */
export interface Response<T = string> {
  body: T;
  headers: IncomingHttpHeaders;
  method?: string;
  statusCode?: number;
  url?: string;
}

/**
 * Wrap `http.get` in a Promise, collects data chunks as a string and resolves
 * the Promise when the `IncomingMessage` indicates it is 'end'ed.
 * @param url to GET.
 * @returns the response data retrieved.
 * @throws any errors emitted by the http request.
 * @throws Error when upstream request is not a 200 response.
 * @throws Error when upstream request results in a content type that does not
 * match `application/json`.
 */
export function request(
  url: string,
  expects: string
): Promise<Response<string>> {
  return new Promise((resolve, reject) => {
    const req = fetch(url, res => {
      const result = {
        body: '',
        headers: res.headers,
        method: res.method,
        statusCode: res.statusCode,
        url: res.url,
      };
      const statusCode = res.statusCode;
      const contentType = res.headers['content-type'];
      const contentTypeMatcher = new RegExp(expects);
      let error: Error | undefined = undefined;
      if (statusCode !== 200) {
        error = new Error(
          `Upstream request failed.\nReceived status code of ${statusCode}`
        );
      } else if (
        contentType !== undefined &&
        !contentTypeMatcher.test(contentType)
      ) {
        error = new Error(
          `Invalid content-type.\nExpected application/json but received ${contentType}`
        );
      }
      if (error !== undefined) {
        // consume response data to free up memory
        res.resume();
        reject(error);
      } else {
        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', chunk => (rawData += chunk));
        res.on('end', () => {
          result.body = rawData;
          try {
            resolve(result);
          } catch (e) {
            reject(e);
          }
        });
      }
    });
    req.on('error', e => reject(e));
  });
}

/**
 * Wrap `http.get` in a Promise, collects data chunks as a string and resolves
 * the Promise when the `IncomingMessage` indicates it is 'end'ed.
 * @param url to GET.
 * @returns the string data retrieved.
 * @throws any errors emitted by the http request.
 * @throws Error when upstream request is not a 200 response.
 * @throws Error when upstream request results in a content type that does not
 * match `application/json`.
 */
export async function execute(
  url: string,
  expects = 'application/json'
): Promise<string> {
  return request(url, expects).then(res => res.body);
}
