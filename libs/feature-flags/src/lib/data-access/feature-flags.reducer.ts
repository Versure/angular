import { createReducer, on } from "@ngrx/store";
import { FeatureFlagsState } from "./feature-flags.state";
import { featureFlagsPageActions } from "./actions/feature-flags-page.actions";

const initialState: FeatureFlagsState = {
  featureFlags: null
}

export const featureFlagsReducer = createReducer<FeatureFlagsState>(
  initialState,
  on(featureFlagsPageActions.setFeatureFlags, (state, { featureFlags }) => ({
    ...state,
    featureFlags: featureFlags
  })),
);
