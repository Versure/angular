import { filter } from 'rxjs';

/**
 * Filter null and undefined values
 * Example: source$.pipe(filterNullAndUndefined());
 */
export const filterNullAndUndefined = <T>() =>
  filter(
    (value: T): value is NonNullable<T> =>
      value !== undefined && value !== null,
  );
