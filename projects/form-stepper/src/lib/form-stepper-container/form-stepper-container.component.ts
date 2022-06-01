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

import { FormStepperMainDirective } from '../form-stepper-main/form-stepper-main.directive';
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
   * Determines whether navigation between steps uses routing.
   */
  @Input() formStepperUseRouting = true;

  /**
   * Template to use as section icon when all the steps in the section are valid.
   */
  @Input() formStepperValidSectionIcon!: TemplateRef<any>;

  /**
   * Determines whether to remove the Onboarding link from the "nav".
   */
  @Input() formStepperNoOnboardingNav = false;

  /**
   * Determines whether to hide the steps from the "nav".
   */
  @Input() formStepperNoStepsNav = false;

  @ContentChild(FormStepperMainDirective) mainDirective!: FormStepperMainDirective;

  @ContentChild(FormStepperOnboardingDirective) onboardingDirective!: FormStepperOnboardingDirective;

  @ContentChild(FormStepperSummaryDirective) summaryDirective!: FormStepperSummaryDirective;

  @ContentChildren(FormStepperSectionDirective) sectionDirectiveQueryList!: QueryList<FormStepperSectionDirective>;

  /**
   * Get an observable of the main infos needed to render the current step.
   */
  readonly main$ = this.service.main$;

  /**
   * Get the main infos snapshot.
   *
   * @example
   * ```ts
   * const { isLastStep } = this.formStepper.mainSnapshot();
   * if (isLastStep) {
   *   // The current step is the last one.
   * }
   * ```
   */
  readonly mainSnapshot = () => this.service.mainSnapshot;

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
