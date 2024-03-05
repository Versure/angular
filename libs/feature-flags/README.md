# @recode/feature-flags

This library contains generic feature-flags functionality that can be used in your Angular apps.

## Guard
The `featureFlagEnabled` guard returns a `CanMatchFn` and can be used to secure your routes. You can provide a feature flag (`string`), to grant users access when the given user flag has been enabled. The `featureFlagEnabled` guard will call the MPW Module API on the base url provided with the `provideFeatureFlags` configuration and will in turn check if the given feature flag has been enabled in the database.

```typescript
import { Route } from '@angular/router';
import { featureFlagEnabled } from "@recode/feature-flags";
import { PageComponent } from "./page/page.component";

export const appRoutes: Route[] = [
  {
    path: 'page',
    canActivate: [featureFlagEnabled('page')],
    component: PageComponent
  }
];
```

## Facade
When you want to limit access to individual parts of your app instead of routes the feature flag package also exposes the `FeatureFlagsFacade`. The `FeatureFlagsFacade` has a method for checking if a given feature flag has been enabled.

### API
| Method             | Return type               | Description                                                                                                                                                                                                                |
|:-------------------|:--------------------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| featureFlagEnabled | `Observable<boolean>`     | The method `featureFlagEnabled` can be used inside your component logic to determine if the given feature flag has been enabled. This allows you to prevent access to certain parts of a page instead of the entire route. |


### Example
```typescript
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from "rxjs";
import { FeatureFlagsFacade } from "@recode/feature-flags";

@Component({
  selector: 'angular-defer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './defer.component.html',
  styleUrl: './defer.component.scss',
})
export class DeferComponent implements OnInit{
  private readonly facade = inject(FeatureFlagsFacade);

  protected flagEnabled$!: Observable<boolean>;

  ngOnInit(): void {
    this.flagEnabled$ = this.facade.featureFlagEnabled('defer');
  }

  protected flagEnabled(flag: string): Observable<boolean> {
    return this.facade.featureFlagEnabled(flag);
  }
}
```

## Running unit tests

Run `nx test utilities` to execute the unit tests.
