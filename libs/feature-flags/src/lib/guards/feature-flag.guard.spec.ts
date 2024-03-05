import { TestBed } from '@angular/core/testing';
import { provideMockStore } from "@ngrx/store/testing";
import { Route, UrlSegment } from "@angular/router";
import { FeatureFlagsFacade } from "../api/feature-flags.facade";
import { featureFlagEnabled } from "./feature-flag.guard";

describe('featureFlagGuard', () => {
  const featureFlagToCheck = 'foo';

  let facade: FeatureFlagsFacade;
  let facadeSpy: jest.SpyInstance;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FeatureFlagsFacade, provideMockStore({})]
    });

    facade = TestBed.inject(FeatureFlagsFacade);
    facadeSpy = jest.spyOn(facade, 'featureFlagEnabled');
  });

  describe('When featureFlagEnabled has been called', () => {
    it('should call the feature flag facade featureFlagEnabled method', () => {
      const canMatchFn = featureFlagEnabled(featureFlagToCheck);
      const route = {} as Route;
      const segments = [] as UrlSegment[];

      TestBed.runInInjectionContext(() => canMatchFn(route, segments));

      expect(facadeSpy).toHaveBeenCalledWith(featureFlagToCheck);
    });
  });
});
