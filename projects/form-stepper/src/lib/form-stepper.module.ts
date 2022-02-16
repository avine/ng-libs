import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormStepperContainerDirective } from './form-stepper-container/form-stepper-container.directive';
import { FormStepperNavComponent } from './form-stepper-nav/form-stepper-nav.component';
import { FormStepperOnboardingDirective } from './form-stepper-onboarding/form-stepper-onboarding.directive';
import { FormStepperSectionDirective } from './form-stepper-section/form-stepper-section.directive';
import { FormStepperStepDirective } from './form-stepper-step/form-stepper-step.directive';
import { FormStepperSummaryDirective } from './form-stepper-summary/form-stepper-summary.directive';

const components = [FormStepperNavComponent];

const directives = [
  FormStepperContainerDirective,
  FormStepperOnboardingDirective,
  FormStepperSectionDirective,
  FormStepperStepDirective,
  FormStepperSummaryDirective,
];

@NgModule({
  imports: [CommonModule],
  declarations: [components, directives],
  exports: [components, directives],
})
export class FormStepperModule {}
