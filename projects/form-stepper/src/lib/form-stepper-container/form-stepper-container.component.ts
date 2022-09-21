import { Subscription } from 'rxjs';

import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { AsyncPipe, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
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
import { FormStepperNavComponent } from '../form-stepper-nav/form-stepper-nav.component';
import { FormStepperOnboardingDirective } from '../form-stepper-onboarding/form-stepper-onboarding.directive';
import { FormStepperSectionDirective } from '../form-stepper-section/form-stepper-section.directive';
import { FormStepperSummaryDirective } from '../form-stepper-summary/form-stepper-summary.directive';
import { FormStepperService } from '../form-stepper.service';
import { FormStepperExtraPage } from '../form-stepper.types';

/**
 * Root component of the FormStepper.
 */
@Component({
  standalone: true,
  imports: [AsyncPipe, NgIf, NgTemplateOutlet, FormStepperNavComponent],
  selector: 'form-stepper-container',
  templateUrl: './form-stepper-container.component.html',
  providers: [FormStepperService],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormStepperContainerComponent implements OnInit, AfterContentInit, AfterViewInit, OnDestroy {
  @HostBinding('class.form-stepper-container') hasClass = true;

  /**
   * Tracks the validity state of the `FormGroup` root.
   */
  @Input() fsFormGroupRoot!: FormGroup;

  /**
   * Determines whether navigation between steps uses routing.
   */
  @Input() fsUseRouting: BooleanInput = true;

  /**
   * Template to use as section icon when all the steps in a section are valid.
   */
  @Input() fsValidSectionIcon!: TemplateRef<any>;

  /**
   * Determines whether to scroll to the top of the `<form-stepper-container>` element on navigation.
   */
  @Input() fsNoScrollToTopOnNavigation: BooleanInput = false;

  /**
   * Determines whether to remove the link to the Onboarding step from the "nav".
   */
  @Input() fsNoOnboardingNav: BooleanInput = false;

  /**
   * Determines whether to hide the steps from the "nav".
   * When set to `true`, only the "sections" are displayed.
   */
  @Input() fsNoStepsNav: BooleanInput = false;

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
   * Ensure that a valid form can only be submitted when the user is in the last step.
   * ```ts
   * \@Component({ ... })
   * export class DemoComponent {
   *   \@ViewChild(FormStepperContainerComponent) formStepper!: FormStepperContainerComponent;
   *
   *   onSubmit() {
   *     const { isLastStep } = this.formStepper.mainSnapshot();
   *     if (!isLastStep) {
   *       return;
   *     }
   *   }
   * }
   * ```
   */
  readonly mainSnapshot = () => this.service.mainSnapshot;

  private sectionsSubscription!: Subscription;

  constructor(
    private service: FormStepperService,
    private elementRef: ElementRef<HTMLElement>,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.service.formGroupRoot = this.fsFormGroupRoot;
    this.service.useRouting = coerceBooleanProperty(this.fsUseRouting);
    if (!coerceBooleanProperty(this.fsNoScrollToTopOnNavigation)) {
      this.service.scrollToTopElementOnNavigation = this.elementRef.nativeElement;
    }
  }

  ngAfterContentInit() {
    this.service.validSectionIcon = this.fsValidSectionIcon;

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
    fsTitle: title,
    fsIcon: icon,
    fsPath: path,
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
