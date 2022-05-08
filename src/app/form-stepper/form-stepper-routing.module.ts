import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FORM_STEPPER_PATH_PARAM } from '@avine/ng-form-stepper';

import { MaterialComponent } from './material/material.component';
import { DemoComponent } from './demo/demo.component';
import { OneLevelComponent } from './one-level/one-level.component';

const routes: Routes = [
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormStepperRoutingModule {}
