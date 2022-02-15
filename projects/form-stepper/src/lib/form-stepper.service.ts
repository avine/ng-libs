import { BehaviorSubject, ReplaySubject, Subscription } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { Injectable, OnDestroy, TemplateRef } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { FORM_STEPPER_URL_PATH_PARAM } from './form-stepper.config';
import { FormStepperNavSection, FormStepperState, FormStepperStep } from './form-stepper.types';

@Injectable()
export class FormStepperService implements OnDestroy {
  steps: FormStepperStep[] = [];

  private stepIndex!: number;

  private maxStepIndexViewed = 0;

  private hasReachedEnd = false;

  private _stepTemplate$ = new ReplaySubject<TemplateRef<any>>(1);

  stepTemplate$ = this._stepTemplate$.asObservable();

  private stepSubscription!: Subscription;

  /*private */nav: FormStepperNavSection[] = [];

  private _state$ = new BehaviorSubject<FormStepperState>({
    currentSectionIndex: 0,
    currentStepIndex: 0,
    isCurrentStepValid: false,
    hasPrevStep: false,
    hasNextStep: false,
    maxStepIndexViewed: 0,
    hasReachedEnd: false,
    sectionProgression: { count: 0, total: 0 },
    nav: [],
  });

  state$ = this._state$.asObservable();

  private urlPathSubscription!: Subscription;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    console.log('>>>', this)
  }

  init() {
    this.urlPathSubscription = this.activatedRoute.paramMap
      .pipe(map((paramMap) => paramMap.get(FORM_STEPPER_URL_PATH_PARAM)))
      .subscribe((currentUrlPath) => {
        if (!this.steps.length) {
          return;
        }
        this.handleUrlPath(currentUrlPath);
      });
  }

  ngOnDestroy() {
    this.urlPathSubscription?.unsubscribe();
  }

  addStep(step: FormStepperStep) {
    this.steps.push(step);
  }

  addNavSection(section: FormStepperNavSection) {
    this.nav.push(section);
  }

  navigateByStepIndex(stepIndex: number) {
    const checkedStepIndex = this.getCheckedStepIndex(stepIndex);
    const { urlPath } = this.steps[checkedStepIndex];
    this.router.navigate(['/form-stepper', urlPath]); // TODO: évaluer l'URL complète...
  }

  prevStep() {
    this.navigateByStepIndex(this.stepIndex - 1);
  }

  nextStep() {
    this.navigateByStepIndex(this.stepIndex + 1);
  }

  private handleUrlPath(currentUrlPath: string | null) {
    const stepIndex = this.steps.findIndex(({ urlPath }) => currentUrlPath === urlPath);

    const hasSkippedSteps =
      stepIndex > 0
        ? this.steps
            .slice(0, stepIndex)
            .some((step) => step.control.hasValidator(Validators.required) && !step.control.touched)
        : false;

    if (stepIndex === -1 || hasSkippedSteps) {
      this.navigateByStepIndex(0);
      return;
    }

    this.setStepByIndex(stepIndex);
  }

  private setStepByIndex(stepIndex: number) {
    this.stepIndex = this.getCheckedStepIndex(stepIndex);
    this.maxStepIndexViewed = Math.max(this.maxStepIndexViewed, this.stepIndex);
    if (this.maxStepIndexViewed === this.steps.length - 1) {
      this.hasReachedEnd = true;
    }

    const step = this.steps[this.stepIndex];

    this._stepTemplate$.next(step.templateRef);

    const updateState = (isCurrentStepValid: boolean) => {
      this._state$.next({
        currentSectionIndex: step.sectionIndex,
        currentStepIndex: step.stepIndex,
        isCurrentStepValid,
        hasPrevStep: this.stepIndex > 0,
        hasNextStep: this.stepIndex < this.steps.length - 1,
        maxStepIndexViewed: this.maxStepIndexViewed,
        hasReachedEnd: this.hasReachedEnd,
        sectionProgression: step.sectionProgression,
        nav: [...this.nav],
      });
    };

    updateState(step.control.valid);

    this.stepSubscription?.unsubscribe();
    this.stepSubscription = step.control.statusChanges
      .pipe(
        distinctUntilChanged(),
        map((status) => status === 'VALID')
      )
      .subscribe(updateState);
  }

  private getCheckedStepIndex(stepIndex: number): number {
    return Math.min(Math.max(0, stepIndex), this.steps.length - 1);
  }
}
