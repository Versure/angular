import { Route } from '@angular/router';
import { featureFlagEnabled } from "@versure/feature-flags";
import { CustomerComponent } from "./customer/customer.component";
import { AppointmentComponent } from "./appointment/appointment.component";
import { DeferComponent } from "./defer/defer.component";

export const appRoutes: Route[] = [
  {
    path: 'customer',
    canActivate: [featureFlagEnabled('customer')],
    component: CustomerComponent
  },
  {
    path: 'appointment',
    canActivate: [featureFlagEnabled('appointment')],
    component: AppointmentComponent
  },
  {
    path: 'defer',
    component: DeferComponent
  },
];
