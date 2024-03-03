import { TestScheduler } from 'rxjs/testing';
import { filterNullAndUndefined } from "./filter.utils";

const testScheduler = new TestScheduler((actual, expected) => {
  expect(actual).toStrictEqual(expected);
});

describe('Observable utilities', () => {
  describe('When filterNullAndUndefined has been called', () => {
    it('Should filter out all null values from an observable', () => {

      testScheduler.run((helpers) => {
        const { cold, expectObservable } = helpers;
        // Create an observable stream that contains null, undefined and defined values
        const source$ = cold('a-b-c-d|', { a: null, b: 42, c: undefined, d: 'hello' });

        // Filter the observable streams using our filter
        const result$ = source$.pipe(filterNullAndUndefined());

        // Assert that the filter filters out all null and undefined values from the stream
        const expected$ = cold('--b---d|', { b: 42, d: 'hello' });
        expectObservable(result$).toEqual(expected$);
      });
    });
  });
});
