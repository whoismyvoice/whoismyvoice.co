import { ResponseError } from './ResponseError';

function createResponse() {
  return {
    json: () => {
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
