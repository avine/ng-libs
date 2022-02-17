import { BehaviorSubject, ReplaySubject, Subscription } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { Injectable, OnDestroy, TemplateRef } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { FORM_STEPPER_PATH_PARAM } from './form-stepper.config';
import { FormStepperExtraPage, FormStepperNavSection, FormStepperState, FormStepperStep } from './form-stepper.types';

@Injectable()
export class FormStepperService implements OnDestroy {
  steps: FormStepperStep[] = [];

  private stepIndex!: number;

  private maxStepIndexViewed = 0;

  private hasReachedEnd = false;

  private _stepTemplate$ = new ReplaySubject<TemplateRef<any>>(1);

  stepTemplate$ = this._stepTemplate$.asObservable();

  private stepSubscription!: Subscription;

  nav: FormStepperNavSection[] = [];

  onboarding!: FormStepperExtraPage;

  summary!: FormStepperExtraPage;

  private _state$ = new BehaviorSubject<FormStepperState>({
    sectionIndex: 0,
    stepIndex: 0,
    isStepValid: false,
    hasPrevStep: false,
    hasNextStep: false,
    maxStepIndexViewed: 0,
    hasReachedEnd: false,
    nav: [],
  });

  state$ = this._state$.asObservable();

  get state() {
    return this._state$.value;
  }

  private pathSubscription!: Subscription;

  private get firstStepIndex() {
    return this.onboarding ? -1 : 0;
  }

  private get lastStepIndex() {
    return this.steps.length + (this.summary ? 0 : -1);
  }

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  init() {
    this.pathSubscription = this.activatedRoute.paramMap
      .pipe(map((paramMap) => paramMap.get(FORM_STEPPER_PATH_PARAM)))
      .subscribe((currentPath) => {
        if (!this.steps.length) {
          return;
        }
        this.handlePath(currentPath);
      });
  }

  ngOnDestroy() {
    this.pathSubscription?.unsubscribe();
  }

  addStep(step: FormStepperStep) {
    this.steps.push(step);
  }

  addNavSection(section: FormStepperNavSection) {
    this.nav.push(section);
  }

  navigateByStepIndex(stepIndex: number) {
    const nextStepIndex = this.getCheckedStepIndex(stepIndex);
    let nextPath: string;
    if (nextStepIndex === -1) {
      nextPath = this.onboarding.path;
    } else if (nextStepIndex === this.steps.length) {
      nextPath = this.summary.path;
    } else {
      nextPath = this.steps[nextStepIndex].path;
    }

    // Do the best to identify the current path
    let currentPath: string | undefined;
    if (this.stepIndex !== undefined && this.router.url.match(`/${this.steps[this.stepIndex]?.path}`)) {
      currentPath = this.steps[this.stepIndex]?.path;
    } else if (this.onboarding && this.router.url.match(`/${this.onboarding.path}`)) {
      currentPath = this.onboarding.path;
    } else if (this.summary && this.router.url.match(`/${this.summary.path}`)) {
      currentPath = this.summary.path;
    } else {
      currentPath = this.steps.find(({ path }) => this.router.url.match(`/${path}`))?.path;
    }
    if (!currentPath) {
      // Back to homepage when unable to identify the current path
      this.router.navigate(['/']);
      return;
    }
    this.router.navigateByUrl(this.router.url.replace(`/${currentPath}`, `/${nextPath}`));
  }

  prevStep() {
    this.navigateByStepIndex(this.stepIndex - 1);
  }

  nextStep() {
    this.navigateByStepIndex(this.stepIndex + 1);
  }

  private handlePath(path: string | null) {
    if (path === this.onboarding?.path || path === this.summary?.path && !this.hasSkippedSomePreviousSteps()) {
      this.handleExtraPagePath(path);
      return;
    }

    const stepIndex = this.steps.findIndex((step) => path === step.path);
    if (stepIndex === -1 || this.hasSkippedSomePreviousSteps(stepIndex)) {
      this.navigateByStepIndex(this.summary ? -1 : 0);
      return;
    }
    this.setStepByIndex(stepIndex);
  }

  private hasSkippedSomePreviousSteps(stepIndex = this.steps.length - 1): boolean {
    return stepIndex > 0
      ? this.steps
          .slice(0, stepIndex)
          .some((step) => step.control.hasValidator(Validators.required) && !step.control.touched)
      : false;
  }

  private handleExtraPagePath(path: string) {
    if (path === this.summary?.path) {
      this.maxStepIndexViewed = this.lastStepIndex;
      this.hasReachedEnd = true;
    }

    const commonState: Pick<FormStepperState, 'isStepValid' | 'maxStepIndexViewed' | 'hasReachedEnd' | 'nav'> = {
      isStepValid: true,
      maxStepIndexViewed: this.maxStepIndexViewed,
      hasReachedEnd: this.hasReachedEnd,
      nav: [...this.nav],
    };

    if (path === this.onboarding?.path) {
      this.stepIndex = -1;
      this._stepTemplate$.next(this.onboarding.templateRef);
      this._state$.next({
        sectionIndex: -1,
        stepIndex: -1,
        hasPrevStep: false,
        hasNextStep: true,
        ...commonState,
      });
    } else if (path === this.summary?.path) {
      this.stepIndex = this.steps.length;
      this._stepTemplate$.next(this.summary.templateRef);
      this._state$.next({
        sectionIndex: this.nav.length,
        stepIndex: this.steps.length,
        hasPrevStep: true,
        hasNextStep: false,
        ...commonState,
      });
    }
  }

  private setStepByIndex(stepIndex: number) {
    this.stepIndex = this.getCheckedStepIndex(stepIndex);
    this.maxStepIndexViewed = Math.max(this.maxStepIndexViewed, this.stepIndex);
    if (this.maxStepIndexViewed === this.lastStepIndex) {
      this.hasReachedEnd = true;
    }

    const step = this.steps[this.stepIndex];

    this._stepTemplate$.next(step.templateRef);

    const updateState = (isStepValid: boolean) => {
      this._state$.next({
        sectionIndex: step.sectionIndex,
        stepIndex: step.stepIndex,
        sectionProgression: step.sectionProgression,
        isStepValid,
        hasPrevStep: this.stepIndex > this.firstStepIndex,
        hasNextStep: this.stepIndex < this.lastStepIndex,
        maxStepIndexViewed: this.maxStepIndexViewed,
        hasReachedEnd: this.hasReachedEnd,
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
    return Math.min(Math.max(this.firstStepIndex, stepIndex), this.lastStepIndex);
  }
}
