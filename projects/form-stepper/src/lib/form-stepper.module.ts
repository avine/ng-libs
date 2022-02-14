import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FormStepperContainerDirective } from './form-stepper-container/form-stepper-container.directive';
import { FormStepperNavComponent } from './form-stepper-nav/form-stepper-nav.component';
import { FormStepperSectionDirective } from './form-stepper-section/form-stepper-section.directive';
import { FormStepperStepDirective } from './form-stepper-step/form-stepper-step.directive';

const features = [
  FormStepperNavComponent,
  FormStepperContainerDirective,
  FormStepperSectionDirective,
  FormStepperStepDirective,
];

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: features,
  exports: features,
})
export class FormStepperModule {}
