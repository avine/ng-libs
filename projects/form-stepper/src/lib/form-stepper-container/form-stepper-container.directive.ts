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
  @ContentChild(FormStepperOnboardingDirective) onboardingDirective!: FormStepperOnboardingDirective;

  @ContentChild(FormStepperSummaryDirective) summaryDirective!: FormStepperSummaryDirective;

  sectionTitle$ = this.service.sectionTitle$;

  stepTemplate$ = this.service.stepTemplate$;

  state$ = this.service.state$;

  prevStep = this.service.prevStep.bind(this.service);

  nextStep = this.service.nextStep.bind(this.service);

  constructor(private service: FormStepperService) {}

  ngAfterContentInit() {
    if (this.onboardingDirective) {
      const { formStepperTitle: title, formStepperPath: path, templateRef } = this.onboardingDirective;
      this.service.onboarding = { title, path, templateRef };
    }
    if (this.summaryDirective) {
      const { formStepperTitle: title, formStepperPath: path, templateRef } = this.summaryDirective;
      this.service.summary = { title, path, templateRef };
    }
  }

  ngAfterViewInit() {
    setTimeout(() => this.service.init(), 0);
  }
}
