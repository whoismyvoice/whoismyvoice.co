/**
 * Type guard to check if the given item exists (is not `null` and not
 * `undefined`.
 * @param item to test.
 * @return `true` iff `item` is neither `null` nor `undefined`.
 */
export function isDefined<T>(item: T | undefined | null): item is T {
  return item !== undefined && item !== null;
}
