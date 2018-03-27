/* tslint:disable:no-any */
import { Response, ResponseError } from './ResponseError';

interface BodyContent {
  error?: BodyErrorContent;
}

interface BodyErrorContent {
  code?: number;
  errors?: Array<ErrorRecord>;
  message?: string;
}

interface ErrorRecord {
  type: string;
  message?: string;
}

function objectHasProp(propName: string, type: string, o: object) {
  return typeof o === 'object' && typeof o[propName] === type;
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
    this.response = response;
    const content: Promise<BodyContent> = this.response.json();
    this.code = content.then(body => {
      const error = (body.error === undefined && {}) || body.error!;
      return (typeof error.code === 'number' && error.code) || 500;
    });
    this.errors = content.then(body => {
      const error = (body.error === undefined && {}) || body.error!;
      return (error.errors instanceof Array && error.errors) || [];
    });
    this.responseMessage = content.then(body => {
      const error = (body.error === undefined && {}) || body.error!;
      return (typeof error.message === 'string' && error.message) || 'Error';
    });
  }

  get isGlobal(): Promise<boolean> {
    return this.errors.then(errors => {
      const filterFn = objectHasProp.bind(this, 'type', 'string');
      const intermediate = errors.filter(filterFn);
      return intermediate.reduce((r, err) => r && err.type === 'global', true);
    });
  }

  get errorMessages(): Promise<Array<string>> {
    return this.errors.then(errors => {
      const filterFn = objectHasProp.bind(this, 'message', 'string');
      return errors.filter(filterFn).map(err => err.message!);
    });
  }
}
