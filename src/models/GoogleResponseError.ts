/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResponseError } from './ResponseError';

interface BodyContent {
  readonly error?: BodyErrorContent;
}

interface BodyErrorContent {
  readonly code?: number;
  readonly errors?: Array<ErrorRecord>;
  readonly message?: string;
}

interface ErrorRecord {
  readonly domain: string | undefined;
  readonly message: string | undefined;
  readonly reason: string | undefined;
}

/**
 * Extends `Error` accepting a Fetch response in addition to normal `Error`
 * arguments.
 */
export class GoogleResponseError extends ResponseError {
  code: Promise<number>;
  errors: Promise<Array<ErrorRecord>>;
  response: Response;
  responseMessage: Promise<string>;

  constructor(response: Response, ...args: Array<any>) {
    super(response, ...args);
    // Set the prototype explicitly.
    Object.setPrototypeOf(this, GoogleResponseError.prototype);
    this.name = 'GoogleResponseError';
    this.response = response;
    const content: Promise<BodyContent> = this.response.json();
    this.code = content.then((body) => body.error?.code || 500);
    this.errors = content.then((body) => body.error?.errors || []);
    this.responseMessage = content.then(
      (body) => body.error?.message || 'Error'
    );
  }

  get isGlobal(): Promise<boolean> {
    return this.errors.then((errors) => {
      return errors.reduce<boolean>(
        (r, err) =>
          r && typeof err.domain === 'string' && err.domain === 'global',
        true
      );
    });
  }

  get isParseError(): Promise<boolean> {
    return this.errors.then((errors) => {
      return errors.reduce<boolean>(
        (r, err) =>
          r && typeof err.reason === 'string' && err.reason === 'parseError',
        true
      );
    });
  }

  get errorMessages(): Promise<Array<string>> {
    return this.errors.then((errors) => {
      return errors
        .map((err) => err.message)
        .filter((m): m is string => typeof m === 'string');
    });
  }
}
