import { ResponseError } from './ResponseError';

function createResponse(): Response {
  // @ts-ignore not a full Response object
  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    json: (): Promise<any> => {
      return Promise.resolve({
        error: { message: 'foo' },
      });
    },
    ok: true,
    status: 200,
  };
}

it('is an Error', () => {
  const error = new ResponseError(createResponse());
  expect(error).toBeInstanceOf(Error);
});

it('is a ResponseError', () => {
  const error = new ResponseError(createResponse());
  expect(error).toBeInstanceOf(ResponseError);
});
