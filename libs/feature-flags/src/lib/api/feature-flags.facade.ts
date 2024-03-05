import { inject, Injectable } from "@angular/core";
import { map, Observable, of } from "rxjs";
import { FeatureFlagsState } from "../data-access/feature-flags.state";
import { Store } from "@ngrx/store";
import { featureFlagsFeature } from "../data-access/feature-flags.feature";
import { filterNullAndUndefined } from "@recode/utilities";
import { featureFlagsPageActions } from "../data-access/actions/feature-flags-page.actions";

@Injectable()
export class FeatureFlagsFacade {
  private readonly store = inject(Store<FeatureFlagsState>);

  updateFeatureFlags(featureFlags: string[]): void {
    this.store.dispatch(featureFlagsPageActions.setFeatureFlags({ featureFlags }));
  }

  featureFlagEnabled(key: string): Observable<boolean>{
    if(!key){
      return of(false);
    }

    const caseInsensitiveFlag = key.toLowerCase();

    return this.store.select(featureFlagsFeature.selectFeatureFlags).pipe(
      filterNullAndUndefined(),
      // Convert feature flags to lowercase
      map((featureFlags) => featureFlags?.map(featureFlag => featureFlag.toLowerCase())),
      // Check if any of the given feature flags exist in the list of feature flags that have been enabled
      map((caseInsensitiveFlags) => caseInsensitiveFlags?.some(featureFlag => featureFlag === caseInsensitiveFlag))
    );
  }
}
