import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideFeatureFlags } from "@recode/feature-flags";

const featureFlags = ["customer", "defer"];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideFeatureFlags(featureFlags)
  ],
};

