import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { FormStepperContainerComponent } from './form-stepper-container/form-stepper-container.component';
import { FormStepperContainerDirective } from './form-stepper-container/form-stepper-container.directive';
import { FormStepperControlDirective } from './form-stepper-control/form-stepper-control.directive';
import { FormStepperIconComponent } from './form-stepper-icon/form-stepper-icon.component';
import { FormStepperMainComponent } from './form-stepper-main/form-stepper-main.component';
import { FormStepperNavComponent } from './form-stepper-nav/form-stepper-nav.component';
import { FormStepperNextDirective } from './form-stepper-next/form-stepper-next.directive';
import { FormStepperOnboardingDirective } from './form-stepper-onboarding/form-stepper-onboarding.directive';
import { FormStepperPrevDirective } from './form-stepper-prev/form-stepper-prev.directive';
import { FormStepperQuicknavComponent } from './form-stepper-quicknav/form-stepper-quicknav.component';
import { FormStepperSectionIconComponent } from './form-stepper-section-icon/form-stepper-section-icon.component';
import { FormStepperSectionDirective } from './form-stepper-section/form-stepper-section.directive';
import { FormStepperStepDirective } from './form-stepper-step/form-stepper-step.directive';
import { FormStepperSummaryDirective } from './form-stepper-summary/form-stepper-summary.directive';
import { FORM_STEPPER_DEFAULT_CONFIG } from './form-stepper.config';
import { provideFormStepperConfig } from './form-stepper.utils';

const components = [
  FormStepperContainerComponent,
  FormStepperIconComponent,
  FormStepperMainComponent,
  FormStepperNavComponent,
  FormStepperQuicknavComponent,
  FormStepperSectionIconComponent,
];

const directives = [
  FormStepperContainerDirective,
  FormStepperControlDirective,
  FormStepperNextDirective,
  FormStepperOnboardingDirective,
  FormStepperPrevDirective,
  FormStepperSectionDirective,
  FormStepperStepDirective,
  FormStepperSummaryDirective,
];

@NgModule({
  imports: [CommonModule],
  declarations: [components, directives],
  exports: [components, directives],
})
export class FormStepperModule {
  static forRoot(config = FORM_STEPPER_DEFAULT_CONFIG): ModuleWithProviders<FormStepperModule> {
    return {
      ngModule: FormStepperModule,
      providers: [provideFormStepperConfig(config)],
    };
  }

  static forChild(): ModuleWithProviders<FormStepperModule> {
    return {
      ngModule: FormStepperModule,
    };
  }
}
