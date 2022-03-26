import { Subscription } from 'rxjs';

import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectorRef,
  ContentChild,
  ContentChildren,
  Directive,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  TemplateRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormStepperOnboardingDirective } from '../form-stepper-onboarding/form-stepper-onboarding.directive';
import { FormStepperSectionDirective } from '../form-stepper-section/form-stepper-section.directive';
import { FormStepperSummaryDirective } from '../form-stepper-summary/form-stepper-summary.directive';
import { FormStepperService } from '../form-stepper.service';
import { FormStepperExtraPage } from '../form-stepper.types';

@Directive({
  selector: '[formStepperContainer]',
  providers: [FormStepperService],
  exportAs: 'formStepper',
})
export class FormStepperContainerDirective implements OnInit, AfterContentInit, AfterViewInit, OnDestroy {
  @Input() formStepperGroupRoot!: FormGroup;

  @Input() formStepperValidSectionIcon!: TemplateRef<any>;

  @ContentChild(FormStepperOnboardingDirective) onboardingDirective!: FormStepperOnboardingDirective;

  @ContentChild(FormStepperSummaryDirective) summaryDirective!: FormStepperSummaryDirective;

  @ContentChildren(FormStepperSectionDirective) sectionDirectiveQueryList!: QueryList<FormStepperSectionDirective>;

  main$ = this.service.main$;

  private sectionsSubscription!: Subscription;

  constructor(private service: FormStepperService, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.service.formGroupRoot = this.formStepperGroupRoot;
  }

  ngAfterContentInit() {
    this.service.validSectionIcon = this.formStepperValidSectionIcon;

    if (this.onboardingDirective) {
      this.service.onboarding = this.getExtraPage(this.onboardingDirective);
    }
    if (this.summaryDirective) {
      this.service.summary = this.getExtraPage(this.summaryDirective);
    }

    this.sectionDirectiveQueryList.forEach((section) => section.register());
    this.sectionsSubscription = this.sectionDirectiveQueryList.changes.subscribe(() => this.updateSections());
  }

  ngAfterViewInit() {
    this.service.init();
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy() {
    this.sectionsSubscription?.unsubscribe();
  }

  private getExtraPage({
    formStepperTitle: title,
    formStepperIcon: icon,
    formStepperPath: path,
    template,
  }: FormStepperOnboardingDirective | FormStepperSummaryDirective): FormStepperExtraPage {
    return { title, icon, path, template };
  }

  private updateSections() {
    this.service.resetIndexes();
    this.sectionDirectiveQueryList.forEach((section) => section.register());
    this.service.refreshCurrentStep();
  }
}
