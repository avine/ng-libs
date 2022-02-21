import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FORM_STEPPER_PATH_PARAM } from '@avine/ng-form-stepper';

import { OneLevelComponent } from './one-level/one-level.component';
import { SimpleComponent } from './simple/simple.component';
import { TwoLevelsComponent } from './two-levels/two-levels.component';

const routes: Routes = [
  {
    path: `simple/:${FORM_STEPPER_PATH_PARAM}`,
    component: SimpleComponent,
  },
  {
    path: `one-level/:${FORM_STEPPER_PATH_PARAM}`,
    component: OneLevelComponent,
  },
  {
    path: `two-levels/:${FORM_STEPPER_PATH_PARAM}`,
    component: TwoLevelsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormStepperRoutingModule {}
