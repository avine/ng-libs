import { Subscription } from 'rxjs';

import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  HostBinding,
  Input,
  OnDestroy,
  QueryList,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormStepperOnboardingDirective } from '../form-stepper-onboarding/form-stepper-onboarding.directive';
import { FormStepperSectionDirective } from '../form-stepper-section/form-stepper-section.directive';
import { FormStepperSummaryDirective } from '../form-stepper-summary/form-stepper-summary.directive';
import { FormStepperService } from '../form-stepper.service';

@Component({
  selector: 'form-stepper-container',
  templateUrl: './form-stepper-container.component.html',
  styleUrls: ['./form-stepper-container.component.scss'],
  providers: [FormStepperService],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormStepperContainerComponent implements AfterContentInit, AfterViewInit, OnDestroy {
  @HostBinding('class.form-stepper-container') hasClass = true;

  @Input() formStepperRoot!: FormGroup;

  @Input() formStepperDisabled!: boolean;

  @ContentChild(FormStepperOnboardingDirective) onboardingDirective!: FormStepperOnboardingDirective;

  @ContentChild(FormStepperSummaryDirective) summaryDirective!: FormStepperSummaryDirective;

  @ContentChildren(FormStepperSectionDirective) sectionDirectiveQueryList!: QueryList<FormStepperSectionDirective>;

  state$ = this.service.state$;

  translations = this.service.translations;

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
