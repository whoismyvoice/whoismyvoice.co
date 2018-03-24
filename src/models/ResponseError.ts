/**
 * Extends `Error` accepting a Fetch response in addition to normal `Error`
 * arguments.
 */
export class ResponseError extends Error {
  response: any;

  constructor(response: any, ...args: Array<any>) {
    super(...args);
    this.response = response;
  }
}
