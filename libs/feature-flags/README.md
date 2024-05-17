# @versure/feature-flags

This library contains generic feature-flags functionality that can be used in your Angular apps.

## Installation
To install the library using npm you can use the following command:
`npm install @versure/feature-flags`

## Configuration
You can use the `provideFeatureFlags` provider to register the package and provide the enabled feature flags:
```typescript
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideFeatureFlags } from "@versure/feature-flags";

const featureFlags = ["customer", "defer"];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideFeatureFlags(featureFlags)
  ],
};
```

## Guard
The `featureFlagEnabled` guard returns a `CanMatchFn` and can be used to secure your routes. You can provide a feature flag (`string`), to grant users access when the given user flag has been enabled. The `featureFlagEnabled` guard will call the MPW Module API on the base url provided with the `provideFeatureFlags` configuration and will in turn check if the given feature flag has been enabled in the database.

```typescript
import { Route } from '@angular/router';
import { featureFlagEnabled } from "@versure/feature-flags";
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


### Example using @defer
**component.html**
```angular17html
<h1>Defer block sample</h1>
<p>
  This page contains two defer blocks which will only display their contents when the defer feature flag has been enabled.

  @defer(when featureFlagEnabled('defer') | async){
  <p>This block will only display when the defer feature flag has been enabled.</p>
  <em>This example is using a function call to determine the feature flag that can access this element.</em>
}

  @defer(when isEnabled$ | async){
  <p>This block will only display when the defer feature flag has been enabled.</p>
  <em>This example is using an observable to determine the feature flag that can access this element.</em>
}
</p>
```
**component.ts**
```typescript
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureFlagsFacade } from "@versure/feature-flags";
import { Observable } from "rxjs";

@Component({
  selector: 'versure-defer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './defer.component.html',
  styleUrl: './defer.component.scss',
})
export class DeferComponent implements OnInit{
  private readonly facade = inject(FeatureFlagsFacade);

  protected isEnabled$!: Observable<boolean>;

  ngOnInit(): void {
    this.isEnabled$ = this.facade.featureFlagEnabled('customer');
  }

  protected featureFlagEnabled(featureFlag: string): Observable<boolean> {
    return this.facade.featureFlagEnabled(featureFlag);
  }
}
```

## Running unit tests

Run `nx test utilities` to execute the unit tests.
