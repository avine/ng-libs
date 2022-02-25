import { Subscription } from 'rxjs';

import {
  AfterContentInit,
  AfterViewInit,
  ContentChild,
  ContentChildren,
  Directive,
  OnDestroy,
  QueryList,
} from '@angular/core';

import { FormStepperOnboardingDirective } from '../form-stepper-onboarding/form-stepper-onboarding.directive';
import { FormStepperSectionDirective } from '../form-stepper-section/form-stepper-section.directive';
import { FormStepperSummaryDirective } from '../form-stepper-summary/form-stepper-summary.directive';
import { FormStepperService } from '../form-stepper.service';

@Directive({
  selector: '[formStepperContainer]',
  providers: [FormStepperService],
  exportAs: 'formStepper',
})
export class FormStepperContainerDirective implements AfterContentInit, AfterViewInit, OnDestroy {
  @ContentChild(FormStepperOnboardingDirective) onboardingDirective!: FormStepperOnboardingDirective;

  @ContentChild(FormStepperSummaryDirective) summaryDirective!: FormStepperSummaryDirective;

  @ContentChildren(FormStepperSectionDirective) sectionDirectiveQueryList!: QueryList<FormStepperSectionDirective>;

  sectionTitle$ = this.service.sectionTitle$;

  stepTemplate$ = this.service.stepTemplate$;

  state$ = this.service.state$;

  prevStep = this.service.prevStep.bind(this.service);

  nextStep = this.service.nextStep.bind(this.service);

  private sectionsSubscription!: Subscription;

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

    this.sectionDirectiveQueryList.forEach((section) => section.register());
    this.sectionsSubscription = this.sectionDirectiveQueryList.changes.subscribe(() => this.updateSections());
  }

  ngAfterViewInit() {
    setTimeout(() => this.service.init(), 0);
  }

  ngOnDestroy() {
    this.sectionsSubscription?.unsubscribe();
  }

  private updateSections() {
    this.service.resetIndexes();
    this.sectionDirectiveQueryList.forEach((section) => section.register());
    this.service.refreshCurrentStep();
  }
}
