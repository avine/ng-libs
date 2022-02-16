import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FORM_STEPPER_PATH_PARAM } from '@avine/ng-form-stepper';

import { FormStepperComponent } from './form-stepper/form-stepper.component';
import { IfNonNullishComponent } from './if-non-nullish/if-non-nullish.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/if-non-nullish',
    pathMatch: 'full',
  },
  {
    path: 'if-non-nullish',
    component: IfNonNullishComponent,
  },
  {
    path: `form-stepper/:${FORM_STEPPER_PATH_PARAM}`,
    component: FormStepperComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
