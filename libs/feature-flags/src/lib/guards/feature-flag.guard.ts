import { CanMatchFn } from '@angular/router';
import { inject } from "@angular/core";
import { FeatureFlagsFacade } from "../api/feature-flags.facade";

/**
 * Guard that checks if the given feature flag has been enabled or not
 * @param featureFlag
 */
export function featureFlagEnabled(featureFlag: string): CanMatchFn {
  return () => {
    const featureFlagsFacade = inject(FeatureFlagsFacade);
    return featureFlagsFacade.featureFlagEnabled(featureFlag);
  };
}
