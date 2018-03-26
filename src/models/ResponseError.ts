/* tslint:disable:no-any */
interface Response {
  // @ts-ignore
  json(): Promise<any>;
}

/**
 * Extends `Error` accepting a Fetch response in addition to normal `Error`
 * arguments.
 */
export class ResponseError extends Error {
  // @ts-ignore
  response: any;

  // @ts-ignore
  constructor(response: Response, ...args: Array<any>) {
    super(...args);
    this.response = response;
  }
}
