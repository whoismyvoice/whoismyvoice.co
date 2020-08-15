/**
 * Extends `Error` accepting a Fetch response in addition to normal `Error`
 * arguments.
 */
export class ResponseError extends Error {
  response: Response;

  constructor(response: Response, message?: string) {
    super(message);
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, ResponseError.prototype);
    this.name = 'ResponseError';
    this.response = response;
  }
}
