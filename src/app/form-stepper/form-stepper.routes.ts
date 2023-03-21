import { Routes } from '@angular/router';
import { FORM_STEPPER_PATH_PARAM, provideFormStepperConfig } from '@avine/ng-form-stepper';

import { DemoComponent } from './demo/demo.component';
import { MaterialComponent } from './material/material.component';
import { OneLevelComponent } from './one-level/one-level.component';

export const FORM_STEPPER_ROUTES: Routes = [
  {
    path: '',
    providers: [provideFormStepperConfig({ breakpoint: '960px' })],
    children: [
      {
        path: `demo/:${FORM_STEPPER_PATH_PARAM}`,
        component: DemoComponent,
      },
      {
        path: `one-level/:${FORM_STEPPER_PATH_PARAM}`,
        component: OneLevelComponent,
      },
      {
        path: `material/:${FORM_STEPPER_PATH_PARAM}`,
        component: MaterialComponent,
      },
    ],
  },
];
