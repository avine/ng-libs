import { BehaviorSubject, ReplaySubject, Subscription } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { Injectable, OnDestroy, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FORM_STEPPER_URL_PATH_PARAM } from './form-stepper.config';
import { FormStepperNavSection, FormStepperState, FormStepperStep } from './form-stepper.types';

@Injectable()
export class FormStepperService implements OnDestroy {
  steps: FormStepperStep[] = [];

  private stepIndex!: number;

  private _stepTemplate$ = new ReplaySubject<TemplateRef<any>>(1);

  stepTemplate$ = this._stepTemplate$.asObservable();

  private stepSubscription!: Subscription;

  private allStepsViewed = false;

  private nav: FormStepperNavSection[] = [];

  private _state$ = new BehaviorSubject<FormStepperState>({
    isCurrentStepValid: false,
    hasPrevStep: false,
    hasNextStep: false,
    allStepsViewed: false,
    nav: [],
  });

  state$ = this._state$.asObservable();

  private urlPathSubscription!: Subscription;

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
    const newStepIndex = this.getNewStepIndex(stepIndex);
    if (newStepIndex === null) {
      return;
    }
    const { urlPath } = this.steps[newStepIndex];
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

    /*
      ! TODO: does not work if a previous step is not required and then untouched
      In this case, you simply can not go to next step until you touch the optional control...
    */
    const hasSkippedSteps =
      stepIndex > 0 ? this.steps.slice(0, stepIndex).some((step) => !step.control.touched) : false;

    if (stepIndex === -1 || hasSkippedSteps) {
      this.navigateByStepIndex(0);
      return;
    }

    this.setStepByIndex(stepIndex);
  }

  private setStepByIndex(stepIndex: number) {
    const newStepIndex = this.getNewStepIndex(stepIndex);
    if (newStepIndex === null) {
      return;
    }
    this.stepIndex = newStepIndex;
    if (this.stepIndex === this.steps.length - 1) {
      this.allStepsViewed = true;
    }

    const step = this.steps[this.stepIndex];

    this._stepTemplate$.next(step.templateRef);

    const updateState = (isCurrentStepValid: boolean) => {
      this._state$.next({
        isCurrentStepValid,
        hasPrevStep: this.stepIndex > 0,
        hasNextStep: this.stepIndex < this.steps.length - 1,
        allStepsViewed: this.allStepsViewed,
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

  private getNewStepIndex(stepIndex: number): number | null {
    const newStepIndex = Math.min(Math.max(0, stepIndex), this.steps.length - 1);
    if (newStepIndex === this.stepIndex) {
      return null;
    }
    return newStepIndex;
  }
}
