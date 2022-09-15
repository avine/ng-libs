import { FormStepperContainerComponent } from './form-stepper-container/form-stepper-container.component';
import { FormStepperControlDirective } from './form-stepper-control/form-stepper-control.directive';
import { FormStepperIconComponent } from './form-stepper-icon/form-stepper-icon.component';
import { FormStepperMainDirective } from './form-stepper-main/form-stepper-main.directive';
import { FormStepperNavComponent } from './form-stepper-nav/form-stepper-nav.component';
import { FormStepperNextDirective } from './form-stepper-next/form-stepper-next.directive';
import { FormStepperOnboardingDirective } from './form-stepper-onboarding/form-stepper-onboarding.directive';
import { FormStepperPrevAnchorDirective } from './form-stepper-prev-anchor/form-stepper-prev-anchor.directive';
import { FormStepperPrevDirective } from './form-stepper-prev/form-stepper-prev.directive';
import { FormStepperQuicknavComponent } from './form-stepper-quicknav/form-stepper-quicknav.component';
import { FormStepperSectionIconComponent } from './form-stepper-section-icon/form-stepper-section-icon.component';
import { FormStepperSectionDirective } from './form-stepper-section/form-stepper-section.directive';
import { FormStepperStepDirective } from './form-stepper-step/form-stepper-step.directive';
import { FormStepperSummaryDirective } from './form-stepper-summary/form-stepper-summary.directive';

export const FORM_STEPPER_DIRECTIVES = [
  // Components
  FormStepperContainerComponent,
  FormStepperIconComponent,
  FormStepperNavComponent,
  FormStepperQuicknavComponent,
  FormStepperSectionIconComponent,

  // Directives
  FormStepperControlDirective,
  FormStepperMainDirective,
  FormStepperNextDirective,
  FormStepperOnboardingDirective,
  FormStepperPrevAnchorDirective,
  FormStepperPrevDirective,
  FormStepperSectionDirective,
  FormStepperStepDirective,
  FormStepperSummaryDirective,
] as const;
