import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormStepperNavComponent } from './form-stepper-nav/form-stepper-nav.component';
import { FormStepperSectionDirective } from './form-stepper-section/form-stepper-section.directive';
import { FormStepperStepDirective } from './form-stepper-step/form-stepper-step.directive';
import { FormStepperComponent } from './form-stepper.component';

const features = [FormStepperComponent, FormStepperNavComponent, FormStepperSectionDirective, FormStepperStepDirective];

@NgModule({
  imports: [CommonModule],
  declarations: features,
  exports: features,
})
export class FormStepperModule {}
