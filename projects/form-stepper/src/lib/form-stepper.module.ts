import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormStepperConfirmationDirective } from './form-stepper-confirmation/form-stepper-confirmation.directive';
import { FormStepperContainerComponent } from './form-stepper-container/form-stepper-container.component';
import { FormStepperContainerDirective } from './form-stepper-container/form-stepper-container.directive';
import { FormStepperMainComponent } from './form-stepper-main/form-stepper-main.component';
import { FormStepperNavComponent } from './form-stepper-nav/form-stepper-nav.component';
import { FormStepperNextDirective } from './form-stepper-next/form-stepper-next.directive';
import { FormStepperOnboardingDirective } from './form-stepper-onboarding/form-stepper-onboarding.directive';
import { FormStepperPrevDirective } from './form-stepper-prev/form-stepper-prev.directive';
import { FormStepperSectionDirective } from './form-stepper-section/form-stepper-section.directive';
import { FormStepperStepDirective } from './form-stepper-step/form-stepper-step.directive';

const components = [FormStepperContainerComponent, FormStepperMainComponent, FormStepperNavComponent];

const directives = [
  FormStepperConfirmationDirective,
  FormStepperContainerDirective,
  FormStepperNextDirective,
  FormStepperOnboardingDirective,
  FormStepperPrevDirective,
  FormStepperSectionDirective,
  FormStepperStepDirective,
];

@NgModule({
  imports: [CommonModule],
  declarations: [components, directives],
  exports: [components, directives],
})
export class FormStepperModule {}
