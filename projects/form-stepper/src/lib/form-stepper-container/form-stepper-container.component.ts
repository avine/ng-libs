import { Subscription } from 'rxjs';

import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  TemplateRef,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormStepperOnboardingDirective } from '../form-stepper-onboarding/form-stepper-onboarding.directive';
import { FormStepperSectionDirective } from '../form-stepper-section/form-stepper-section.directive';
import { FormStepperSummaryDirective } from '../form-stepper-summary/form-stepper-summary.directive';
import { FormStepperService } from '../form-stepper.service';
import { FormStepperExtraPage } from '../form-stepper.types';

/**
 * Root component of the FormStepper.
 *
 * To get more control of the HTML output, consider using the `FormStepperContainerDirective`
 * instead of the `FormStepperContainerComponent`.
 */
@Component({
  selector: 'form-stepper-container',
  templateUrl: './form-stepper-container.component.html',
  providers: [FormStepperService],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormStepperContainerComponent implements OnInit, AfterContentInit, AfterViewInit, OnDestroy {
  @HostBinding('class.form-stepper-container') hasClass = true;

  /**
   * Tracks the validity state of the form root.
   */
  @Input() formStepperGroupRoot!: FormGroup;

  /**
   * Template to use as section icon when all the steps in the section are valid.
   */
  @Input() formStepperValidSectionIcon!: TemplateRef<any>;

  /**
   * Determines whether navigation between steps uses routing.
   */
  @Input() formStepperUseRouting = true;

  /**
   * Determines whether navigation to the previous step is triggered by a `<button>` or a `<a>`.
   */
  @Input() formStepperUsePrevAnchor = true;

  /**
   * Determines whether the submit button in the last step is disabled
   * (should be set to `true` while the form is being submitted).
   */
  @Input() formStepperDisabled!: boolean;

  @ContentChild(FormStepperOnboardingDirective) onboardingDirective!: FormStepperOnboardingDirective;

  @ContentChild(FormStepperSummaryDirective) summaryDirective!: FormStepperSummaryDirective;

  @ContentChildren(FormStepperSectionDirective) sectionDirectiveQueryList!: QueryList<FormStepperSectionDirective>;

  /**
   * Get an observable of the `FormStepperState`.
   */
  readonly state$ = this.service.state$;

  /**
   * Get the `FormStepperState` snapshot.
   *
   * @example
   * ```ts
   * const { stepIndex, lastStepIndex } = this.formStepper.stateSnapshot();
   * if (stepIndex === lastStepIndex) {
   *   // The current step is the last one.
   * }
   * ```
   */
  readonly stateSnapshot = () => this.service.state;

  private sectionsSubscription!: Subscription;

  constructor(private service: FormStepperService, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.service.formGroupRoot = this.formStepperGroupRoot;
    this.service.useRouting = this.formStepperUseRouting;
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
