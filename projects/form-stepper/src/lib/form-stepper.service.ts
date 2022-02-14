import { BehaviorSubject, ReplaySubject, Subscription } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { Injectable, OnDestroy, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FormStepperNavSection, FormStepperStep } from './form-stepper.types';
import { FORM_STEPPER_URL_PATH_PARAM } from './form-stepper.config';

@Injectable()
export class FormStepperService implements OnDestroy {
  steps: FormStepperStep[] = [];

  private stepIndex!: number;

  private _stepTemplate$ = new ReplaySubject<TemplateRef<any>>(1);

  private _isStepValid$ = new ReplaySubject<boolean>(1);

  stepTemplate$ = this._stepTemplate$.asObservable();

  isStepValid$ = this._isStepValid$.asObservable();

  private stepSubscription!: Subscription;

  private _nav$ = new BehaviorSubject<FormStepperNavSection[]>([]);

  nav$ = this._nav$.asObservable();

  private urlPathSubscription = this.activatedRoute.paramMap
    .pipe(map((paramMap) => paramMap.get(FORM_STEPPER_URL_PATH_PARAM)))
    .subscribe((currentUrlPath) => {
      if (!this.steps.length) {
        return;
      }
      this.handleUrlPath(currentUrlPath);
    });

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnDestroy() {
    this.urlPathSubscription.unsubscribe();
  }

  addStep(step: FormStepperStep) {
    this.steps.push(step);
  }

  updateStepByIndex(stepIndex: number) {
    const newStepIndex = this.getNewStepIndex(stepIndex);
    if (newStepIndex === null) {
      return;
    }
    this.stepIndex = newStepIndex;

    const step = this.steps[this.stepIndex];

    this._stepTemplate$.next(step.templateRef);

    const updateStepStatusAndRefreshNav = (isValid: boolean) => {
      this._isStepValid$.next(isValid);
      this._nav$.next([...this._nav$.value]);
    };

    updateStepStatusAndRefreshNav(step.control.valid);

    this.stepSubscription?.unsubscribe();
    this.stepSubscription = step.control.statusChanges
      .pipe(
        distinctUntilChanged(),
        map((status) => status === 'VALID')
      )
      .subscribe(updateStepStatusAndRefreshNav);
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

  handleUrlPath(currentUrlPath: string | null) {
    const stepIndex = this.steps.findIndex(({ urlPath }) => currentUrlPath === urlPath);

    const hasSomePreviousStepsUnouched = this.steps
      .slice(0, Math.max(0, stepIndex - 1))
      .some((step) => !step.control.touched);

    if (stepIndex === -1 || hasSomePreviousStepsUnouched) {
      this.navigateByStepIndex(0);
      return;
    }

    this.updateStepByIndex(stepIndex);
  }

  addNavSection(section: FormStepperNavSection) {
    this._nav$.next([...this._nav$.value, section]);
  }

  private getNewStepIndex(stepIndex: number): number | null {
    const newStepIndex = Math.min(Math.max(0, stepIndex), this.steps.length - 1);
    if (newStepIndex === this.stepIndex) {
      return null;
    }
    return newStepIndex;
  }
}
