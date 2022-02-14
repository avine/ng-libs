import { ReplaySubject, Subscription } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { Injectable, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { FormStepperStep } from './form-stepper.types';

@Injectable({
  providedIn: 'root',
})
export class FormStepperService {
  private _formGroup$ = new ReplaySubject<FormGroup>(1);

  formGroup$ = this._formGroup$.asObservable();

  steps: FormStepperStep[] = [];

  private stepIndex!: number;

  private _currentStep$ = new ReplaySubject<TemplateRef<any>>(1);

  currentStep$ = this._currentStep$.asObservable();

  private _isCurrentStepValid$ = new ReplaySubject<boolean>(1);

  isCurrentStepValid$ = this._isCurrentStepValid$.asObservable();

  private subscription!: Subscription;

  nav: any[] = [];

  private _nav$ = new ReplaySubject<any>(1);

  nav$ = this._nav$.asObservable();

  constructor(private router: Router) {}

  setFormGroup(formGroup: FormGroup) {
    this._formGroup$.next(formGroup);
  }

  addStep(step: FormStepperStep) {
    this.steps.push(step);
  }

  setStep(stepIndex: number) {
    const newStep = Math.min(Math.max(0, stepIndex), this.steps.length - 1);
    if (newStep === this.stepIndex) {
      return;
    }
    this.stepIndex = newStep;

    this._currentStep$.next(this.steps[this.stepIndex].templateRef);

    this._isCurrentStepValid$.next(this.steps[this.stepIndex].control.valid);
    this.emitNav();

    this.subscription?.unsubscribe();
    this.subscription = this.steps[this.stepIndex].control.statusChanges
      .pipe(distinctUntilChanged(), map((status) => status === 'VALID'))
      .subscribe((isValid) => {
        this._isCurrentStepValid$.next(isValid);
        this.emitNav();
      });
  }

  prevStep() {
    this.setStep(this.stepIndex - 1);
  }

  nextStep() {
    this.setStep(this.stepIndex + 1);
  }

  emitNav() {
    this._nav$.next([...this.nav]);
  }
}
