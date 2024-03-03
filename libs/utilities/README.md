# @recode/utilities

This library contains generic utility functions that can be used in your Angular apps.

## Filter

### filterNullAndUndefined
With the `filterNullAndUndefined` filter utility you can filter out `null` and `undefined` values from observable streams.

Example:
```typescript
source$.pipe(filterNullAndUndefined());
```

## Running unit tests

Run `nx test utilities` to execute the unit tests.
