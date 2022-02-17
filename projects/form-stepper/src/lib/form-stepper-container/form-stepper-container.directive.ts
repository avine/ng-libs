import { AfterContentInit, AfterViewInit, ContentChild, Directive } from '@angular/core';

import { FormStepperConfirmationDirective } from '../form-stepper-confirmation/form-stepper-confirmation.directive';
import { FormStepperOnboardingDirective } from '../form-stepper-onboarding/form-stepper-onboarding.directive';
import { FormStepperService } from '../form-stepper.service';

@Directive({
  selector: '[formStepperContainer]',
  providers: [FormStepperService],
  exportAs: 'formStepper',
})
export class FormStepperContainerDirective implements AfterContentInit, AfterViewInit {
  @ContentChild(FormStepperOnboardingDirective) onboardingDirective!: FormStepperOnboardingDirective;

  @ContentChild(FormStepperConfirmationDirective) confirmationDirective!: FormStepperConfirmationDirective;

  stepTemplate$ = this.service.stepTemplate$;

  state$ = this.service.state$;

  prevStep = this.service.prevStep.bind(this.service);

  nextStep = this.service.nextStep.bind(this.service);

  constructor(private service: FormStepperService) {}

  ngAfterContentInit() {
    if (this.onboardingDirective) {
      const { formStepperPath: path, templateRef } = this.onboardingDirective;
      this.service.onboarding = { path, templateRef };
    }
    if (this.confirmationDirective) {
      const { formStepperPath: path, templateRef } = this.confirmationDirective;
      this.service.confirmation = { path, templateRef };
    }
  }

  ngAfterViewInit() {
    setTimeout(() => this.service.init(), 0);
  }
}
