import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormStepperModule as FormStepperLibModule } from '@avine/ng-form-stepper';

import { FormStepperRoutingModule } from './form-stepper-routing.module';
import { FormStepperComponent } from './form-stepper.component';

@NgModule({
  imports: [CommonModule, FormStepperRoutingModule, ReactiveFormsModule, FormStepperLibModule],
  declarations: [FormStepperComponent],
})
export class FormStepperModule {}
