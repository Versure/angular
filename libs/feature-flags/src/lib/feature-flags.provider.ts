import { APP_INITIALIZER, EnvironmentProviders, inject, isDevMode, makeEnvironmentProviders } from "@angular/core";
import { FeatureFlagsFacade } from "./api/feature-flags.facade";
import { provideState, provideStore } from "@ngrx/store";
import { provideStoreDevtools } from "@ngrx/store-devtools";
import { featureFlagsFeature } from "./data-access/feature-flags.feature";

export function provideFeatureFlags(featureFlags: string[]): EnvironmentProviders {
  return makeEnvironmentProviders([
    FeatureFlagsFacade,
    provideStore(),
    provideState(featureFlagsFeature),
    provideStoreDevtools({ name: 'ReCode.FeatureFlags', maxAge: 25, logOnly: !isDevMode() }),
    {
      provide: APP_INITIALIZER,
      useFactory: () => initializeFeatureFlags(featureFlags),
      deps: [FeatureFlagsFacade],
      multi: true,
    },
  ]);
}

function initializeFeatureFlags(featureFlags: string[]) {
  const featureFlagsFacade = inject(FeatureFlagsFacade);
  return () => featureFlagsFacade.updateFeatureFlags(featureFlags);
}
