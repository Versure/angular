import { Route } from '@angular/router';
import { featureFlagEnabled } from "@recode/feature-flags";
import { CustomerComponent } from "./customer/customer.component";
import { AppointmentComponent } from "./appointment/appointment.component";
import { DeferComponent } from "./defer/defer.component";

function UserComponent() {

}

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
