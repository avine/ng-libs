import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FORM_STEPPER_PATH_PARAM } from '@avine/ng-form-stepper';

import { FormStepperComponent } from './form-stepper.component';
import { OneLevelComponent } from './one-level/one-level.component';

const routes: Routes = [
  {
    path: `:${FORM_STEPPER_PATH_PARAM}`,
    component: FormStepperComponent,
  },
  {
    path: `one-level/:${FORM_STEPPER_PATH_PARAM}`,
    component: OneLevelComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormStepperRoutingModule {}
