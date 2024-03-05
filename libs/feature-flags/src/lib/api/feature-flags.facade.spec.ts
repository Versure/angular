/* eslint-disable @typescript-eslint/no-explicit-any */
import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { FeatureFlagsFacade } from "./feature-flags.facade";
import { FeatureFlagsState } from "../data-access/feature-flags.state";
import { featureFlagsFeature } from "../data-access/feature-flags.feature";

describe('FeatureFlagsFacade', () => {
  let facade: FeatureFlagsFacade;
  let store: Store<FeatureFlagsState>;
  let selectSpy: jest.SpyInstance;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FeatureFlagsFacade, provideMockStore({
        initialState: {
          featureFlags: ['feature1', 'feature2']
        }
      })]
    });
    facade = TestBed.inject(FeatureFlagsFacade);
    store = TestBed.inject(MockStore);

    selectSpy = jest.spyOn(store, 'select');
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });

  describe('When featureFlagEnabled has been called', () => {
    it('should call the selector', () => {
      (facade as any).featureFlagEnabled('feature1');
      expect(selectSpy).toHaveBeenCalledWith(featureFlagsFeature.selectFeatureFlags);
    });
  });
});
