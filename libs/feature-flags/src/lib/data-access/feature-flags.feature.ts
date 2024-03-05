import { createFeature } from "@ngrx/store";
import { featureFlagsReducer } from "./feature-flags.reducer";
import { StoreUtil } from "../utils/store.util";

export const featureFlagsFeature = createFeature({
  name: StoreUtil.FeatureKeys.FeatureFlags,
  reducer: featureFlagsReducer
});
