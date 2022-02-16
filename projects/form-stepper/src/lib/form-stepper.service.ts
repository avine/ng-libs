import { BehaviorSubject, ReplaySubject, Subscription } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { Injectable, OnDestroy, TemplateRef } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { FORM_STEPPER_URL_PATH_PARAM } from './form-stepper.config';
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

  private urlPathSubscription!: Subscription;

  private get firstStepIndex() {
    return this.onboarding ? -1 : 0;
  }

  private get lastStepIndex() {
    return this.steps.length + (this.summary ? 0 : -1);
  }

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

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
    const nextStepIndex = this.getCheckedStepIndex(stepIndex);
    let nextUrlPath: string;
    if (nextStepIndex === -1) {
      nextUrlPath = this.onboarding.urlPath;
    } else if (nextStepIndex === this.steps.length) {
      nextUrlPath = this.summary.urlPath;
    } else {
      nextUrlPath = this.steps[nextStepIndex].urlPath;
    }

    // Do the best to identify the current urlPath
    let currentUrlPath: string | undefined;
    if (this.stepIndex !== undefined && this.router.url.match(`/${this.steps[this.stepIndex]?.urlPath}`)) {
      currentUrlPath = this.steps[this.stepIndex]?.urlPath;
    } else if (this.onboarding && this.router.url.match(`/${this.onboarding.urlPath}`)) {
      currentUrlPath = this.onboarding.urlPath;
    } else if (this.summary && this.router.url.match(`/${this.summary.urlPath}`)) {
      currentUrlPath = this.summary.urlPath;
    } else {
      currentUrlPath = this.steps.find(({ urlPath }) => this.router.url.match(`/${urlPath}`))?.urlPath;
    }
    if (!currentUrlPath) {
      // Back to homepage when unable to identify the current urlPath
      this.router.navigate(['/']);
      return;
    }
    this.router.navigateByUrl(this.router.url.replace(`/${currentUrlPath}`, `/${nextUrlPath}`));
  }

  prevStep() {
    this.navigateByStepIndex(this.stepIndex - 1);
  }

  nextStep() {
    this.navigateByStepIndex(this.stepIndex + 1);
  }

  private handleUrlPath(currentUrlPath: string | null) {
    if (currentUrlPath === this.onboarding?.urlPath || currentUrlPath === this.summary?.urlPath) {
      // ! TODO: Si c'est la page summary, il manque de vérifier `hasSkippedSteps`...
      this.handleExtraPageUrlPath(currentUrlPath);
      return;
    }

    const stepIndex = this.steps.findIndex(({ urlPath }) => currentUrlPath === urlPath);

    const hasSkippedSteps =
      stepIndex > 0
        ? this.steps
            .slice(0, stepIndex)
            .some((step) => step.control.hasValidator(Validators.required) && !step.control.touched)
        : false;

    if (stepIndex === -1 || hasSkippedSteps) {
      this.navigateByStepIndex(this.summary ? -1 : 0);
      return;
    }

    this.setStepByIndex(stepIndex);
  }

  private handleExtraPageUrlPath(currentUrlPath: string) {
    const commonState: Pick<FormStepperState, 'isStepValid' | 'maxStepIndexViewed' | 'hasReachedEnd' | 'nav'> = {
      isStepValid: true,
      maxStepIndexViewed: this.maxStepIndexViewed,
      hasReachedEnd: this.hasReachedEnd,
      nav: [...this.nav],
    };

    if (currentUrlPath === this.onboarding?.urlPath) {
      this.stepIndex = -1;
      this._stepTemplate$.next(this.onboarding.templateRef);
      this._state$.next({
        sectionIndex: -1,
        stepIndex: -1,
        hasPrevStep: false,
        hasNextStep: true,
        ...commonState,
      });
    } else if (currentUrlPath === this.summary?.urlPath) {
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
    if (this.maxStepIndexViewed === this.steps.length - 1) {
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
