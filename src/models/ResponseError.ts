/* tslint:disable:no-any */
export interface Response {
  ok: boolean;
  status: number;
  json(): Promise<any>;
}

/**
 * Extends `Error` accepting a Fetch response in addition to normal `Error`
 * arguments.
 */
export class ResponseError extends Error {
  response: Response;

  constructor(response: Response, ...args: Array<any>) {
    super(...args);
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, ResponseError.prototype);
    this.response = response;
  }
}
