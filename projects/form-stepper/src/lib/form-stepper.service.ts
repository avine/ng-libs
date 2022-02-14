import { BehaviorSubject, ReplaySubject, Subscription } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { Injectable, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';

import { FormStepperNavSection, FormStepperStep } from './form-stepper.types';

@Injectable({
  providedIn: 'root',
})
export class FormStepperService {
  steps: FormStepperStep[] = [];

  private stepIndex!: number;

  private _stepTemplate$ = new ReplaySubject<TemplateRef<any>>(1);

  private _isStepValid$ = new ReplaySubject<boolean>(1);

  stepTemplate$ = this._stepTemplate$.asObservable();

  isStepValid$ = this._isStepValid$.asObservable();

  private stepSubscription!: Subscription;

  private _nav$ = new BehaviorSubject<FormStepperNavSection[]>([]);

  nav$ = this._nav$.asObservable();

  constructor(private router: Router) {}

  addStep(step: FormStepperStep) {
    this.steps.push(step);
  }

  setStepIndex(stepIndex: number) {
    const newStepIndex = Math.min(Math.max(0, stepIndex), this.steps.length - 1);
    if (newStepIndex === this.stepIndex) {
      return;
    }
    this.stepIndex = newStepIndex;

    const step = this.steps[this.stepIndex];

    this._stepTemplate$.next(step.templateRef);

    const updateStepStatus = (isValid: boolean) => {
      this._isStepValid$.next(isValid);
      this.emitNav();
    };

    updateStepStatus(step.control.valid);

    this.stepSubscription?.unsubscribe();
    this.stepSubscription = step.control.statusChanges
      .pipe(distinctUntilChanged(), map((status) => status === 'VALID'))
      .subscribe(updateStepStatus);
  }

  prevStep() {
    this.setStepIndex(this.stepIndex - 1);
  }

  nextStep() {
    this.setStepIndex(this.stepIndex + 1);
  }

  addNavSection(section: FormStepperNavSection) {
    this._nav$.next([...this._nav$.value, section]);
  }

  private emitNav() {
    this._nav$.next([...this._nav$.value]);
  }
}
