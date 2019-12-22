import { get as fetch } from 'https';

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
export function execute(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const req = fetch(url, res => {
      const statusCode = res.statusCode;
      const contentType = res.headers['content-type'];
      let error: Error | undefined = undefined;
      if (statusCode !== 200) {
        error = new Error(
          `Upstream request failed.\nReceived status code of ${statusCode}`
        );
      } else if (
        contentType !== undefined &&
        !/^application\/json/.test(contentType)
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
