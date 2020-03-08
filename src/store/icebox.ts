import { Action } from '../actions/types';

export type Handler<T> = (state: T | undefined, action: Action) => T;

/**
 * Make an object constant, recursively freezing each property which is of type
 * object.
 * @param {T} obj to freeze.
 * @param {type} T of the `obj` to freeze.
 * @returns a frozen `T`.
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
 */
export function deepFreeze<T>(obj: T): T {
  // Retrieve the property names defined on obj
  const propNames = Object.getOwnPropertyNames(obj);
  // Freeze properties before freezing self
  propNames.forEach(name => {
    const prop = obj[name];
    // Freeze prop if it is an object
    if (typeof prop === 'object' && prop !== null && prop !== undefined) {
      deepFreeze(prop);
    }
  });
  // Freeze self (no-op if already frozen)
  return Object.freeze(obj);
}

/**
 * Creates a new `Handler` of the same signature as the `handler` function
 * given that freezes the result of `handler` before returning.
 * @param {Handler<T>} handler to be invoked.
 * @param {type} T resulting from `handler` invocations.
 * @returns a new `Handler<T>` that returns frozen `T`.
 */
export function icebox<T>(handler: Handler<T>): Handler<T> {
  return (state: T | undefined, action: Action): T => {
    const newState = handler(state, action);
    return deepFreeze(newState);
  };
}

export default icebox;
