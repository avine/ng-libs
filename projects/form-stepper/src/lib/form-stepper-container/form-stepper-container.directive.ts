import { AfterContentInit, AfterViewInit, ContentChild, Directive } from '@angular/core';

import { FormStepperOnboardingDirective } from '../form-stepper-onboarding/form-stepper-onboarding.directive';
import { FormStepperSummaryDirective } from '../form-stepper-summary/form-stepper-summary.directive';
import { FormStepperService } from '../form-stepper.service';

@Directive({
  selector: '[formStepperContainer]',
  providers: [FormStepperService],
  exportAs: 'formStepper',
})
export class FormStepperContainerDirective implements AfterContentInit, AfterViewInit {
  stepTemplate$ = this.service.stepTemplate$;

  state$ = this.service.state$;

  prevStep = this.service.prevStep.bind(this.service);

  nextStep = this.service.nextStep.bind(this.service);

  @ContentChild(FormStepperOnboardingDirective) onboardingDirective!: FormStepperOnboardingDirective;

  @ContentChild(FormStepperSummaryDirective) summaryDirective!: FormStepperSummaryDirective;

  constructor(private service: FormStepperService) {}

  ngAfterContentInit() {
    if (this.onboardingDirective) {
      const { formStepperPath: path, templateRef } = this.onboardingDirective;
      this.service.onboarding = { path, templateRef };
    }
    if (this.summaryDirective) {
      const { formStepperPath: path, templateRef } = this.summaryDirective;
      this.service.summary = { path, templateRef };
    }
  }

  ngAfterViewInit() {
    setTimeout(() => this.service.init(), 0);
  }
}
