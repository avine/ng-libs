import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormStepperModule as FormStepperLibModule } from '@avine/ng-form-stepper';

import { FormStepperRoutingModule } from './form-stepper-routing.module';
import { OneLevelComponent } from './one-level/one-level.component';
import { TwoLevelsComponent } from './two-levels/two-levels.component';
import { SimpleComponent } from './simple/simple.component';

@NgModule({
  imports: [CommonModule, FormStepperRoutingModule, ReactiveFormsModule, FormStepperLibModule],
  declarations: [OneLevelComponent, TwoLevelsComponent, SimpleComponent],
})
export class FormStepperModule {}
