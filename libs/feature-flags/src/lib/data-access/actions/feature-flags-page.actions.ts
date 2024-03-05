import { createActionGroup, props } from '@ngrx/store';

export const featureFlagsPageActions = createActionGroup({
  source: 'Feature Flags Page',
  events: {
    setFeatureFlags: props<{ featureFlags: string[] }>()
  }
});
