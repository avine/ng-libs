import { BehaviorSubject, combineLatest, Observable, ReplaySubject, Subscription } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { Inject, Injectable, OnDestroy, TemplateRef } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { FORM_STEPPER_CONFIG, FORM_STEPPER_PATH_PARAM } from './form-stepper.config';
import {
  FormStepperConfig,
  FormStepperExtraPage,
  FormStepperMain,
  FormStepperNavSection,
  FormStepperState,
  FormStepperStep,
} from './form-stepper.types';

@Injectable()
export class FormStepperService implements OnDestroy {
  formGroupRoot!: FormGroup;

  private steps: FormStepperStep[] = [];

  private stepIndex!: number;

  private maxStepIndexViewed = -1;

  private allStepsViewed = false;

  private _stepTemplate$ = new ReplaySubject<TemplateRef<any>>(1);

  stepTemplate$ = this._stepTemplate$.asObservable();

  private stepSubscription!: Subscription;

  private nav: FormStepperNavSection[] = [];

  validSectionIcon!: TemplateRef<any>;

  onboarding!: FormStepperExtraPage;

  summary!: FormStepperExtraPage;

  useRouting = true;

  private _state$ = new BehaviorSubject<FormStepperState>({
    sectionIndex: 0,
    stepIndex: 0,
    isStepValid: false,
    hasPrevStep: false,
    hasNextStep: false,
    lastStepIndex: 0,
    maxStepIndexViewed: -1,
    allStepsViewed: false,
    nav: [],
  });

  state$ = this._state$.asObservable();

  get state() {
    return this._state$.value;
  }

  sectionTitle$ = this.state$.pipe(
    map((state): string => {
      if (state.stepIndex === state.onboardingInfo?.index) {
        return state.onboardingInfo?.title;
      }
      if (state.stepIndex === state.summaryInfo?.index) {
        return state.summaryInfo?.title;
      }
      return state.nav[state.sectionIndex]?.title;
    })
  );

  main$: Observable<FormStepperMain> = combineLatest([this.sectionTitle$, this.stepTemplate$, this.state$]).pipe(
    map(([sectionTitle, stepTemplate, state]) => ({
      sectionTitle,
      stepTemplate,
      isLastStep: state.stepIndex === state.lastStepIndex,
    }))
  );

  private pathSubscription!: Subscription;

  private currentPath: string | null = null;

  private get firstStepIndex() {
    return this.onboarding ? -1 : 0;
  }

  private get lastStepIndex() {
    return this.steps.length + (this.summary ? 0 : -1);
  }

  private get currentStepControlsHasNoValue(): boolean {
    const control = this.steps[this.stepIndex]?.control;
    if (!control) {
      return false;
    }
    if (control instanceof FormGroup && Object.values(control.value).some((value) => !!value)) {
      return false;
    }
    if (control instanceof FormArray && (control.value as unknown[]).some((value) => !!value)) {
      return false;
    }
    if (control instanceof FormControl && !!control.value) {
      return false;
    }
    return true;
  }

  private currentStepControlElements = new Set<HTMLElement>();

  constructor(
    @Inject(FORM_STEPPER_CONFIG) public readonly config: FormStepperConfig,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  init() {
    if (this.useRouting) {
      this.initWithRouting();
    } else {
      this.handlePath(this.findPathFromStepIndex(this.firstStepIndex));
    }
  }

  private initWithRouting() {
    this.pathSubscription = this.activatedRoute.paramMap
      .pipe(map((paramMap) => paramMap.get(FORM_STEPPER_PATH_PARAM)))
      .subscribe((currentPath) => {
        if (!this.steps.length) {
          return;
        }
        this.currentPath = currentPath;
        this.handlePath(currentPath);
      });
  }

  ngOnDestroy() {
    this.pathSubscription?.unsubscribe();
  }

  getControl(section: AbstractControl | string, step?: AbstractControl | string): AbstractControl {
    if (step instanceof AbstractControl) {
      return step;
    }
    if (section instanceof AbstractControl) {
      return step ? section.get(step)! : section;
    }
    return step ? this.formGroupRoot.get([section, step])! : this.formGroupRoot.get(section)!;
  }

  getNewIndexes() {
    return { sectionIndex: this.nav.length, stepIndexOffset: this.steps.length };
  }

  findExistingIndexes(formStepperSection: AbstractControl) {
    const sectionIndex = this.nav.findIndex((navSection) => navSection.control === formStepperSection);
    const { stepIndexOffset } = this.nav[sectionIndex];
    return { sectionIndex, stepIndexOffset };
  }

  resetIndexes() {
    this.steps = [];
    this.nav = [];
  }

  addSteps(steps: FormStepperStep[]) {
    this.steps.push(...steps);
  }

  replaceSteps(sectionIndex: number, newSteps: FormStepperStep[]) {
    const { stepIndexOffset, steps: oldSteps } = this.nav[sectionIndex];

    this.steps.splice(stepIndexOffset, oldSteps.length, ...newSteps);

    this.nav[sectionIndex] = { ...this.nav[sectionIndex], steps: newSteps };

    const stepsLengthDelta = newSteps.length - oldSteps.length;
    for (let i = sectionIndex + 1; i < this.nav.length; i++) {
      this.nav[i].stepIndexOffset += stepsLengthDelta;
      for (const step of this.nav[i].steps) {
        step.stepIndex += stepsLengthDelta;
      }
    }
  }

  addNavSection(section: FormStepperNavSection) {
    this.nav.push(section);
  }

  addControlElement(element: HTMLElement) {
    this.currentStepControlElements.add(element);

    if (this.currentStepControlElements.size === 1 && this.currentStepControlsHasNoValue) {
      element.focus?.();
    }
  }

  removeControlElement(element: HTMLElement) {
    this.currentStepControlElements.delete(element);
  }

  navigateByStepIndex(stepIndex: number) {
    if (this.useRouting) {
      this.navigateByStepIndexWithRouting(stepIndex);
    } else {
      this.handlePath(this.findPathFromStepIndex(stepIndex));
    }
  }

  private navigateByStepIndexWithRouting(stepIndex: number) {
    if (!this.currentPath || !this.router.url.match(`/${this.currentPath}`)) {
      // Back to homepage when unable to identify the current path
      this.router.navigate(['/']);
      return;
    }
    const nextPath = this.findPathFromStepIndex(stepIndex);
    this.router.navigateByUrl(this.router.url.replace(`/${this.currentPath}`, `/${nextPath}`));
  }

  private findPathFromStepIndex(stepIndex: number) {
    const checkedStepIndex = this.getCheckedStepIndex(stepIndex);
    if (checkedStepIndex === -1) {
      return this.onboarding.path;
    }
    if (checkedStepIndex === this.steps.length) {
      return this.summary.path;
    }
    return this.steps[checkedStepIndex].path;
  }

  prevStep() {
    this.navigateByStepIndex(this.stepIndex - 1);
  }

  nextStep() {
    this.navigateByStepIndex(this.stepIndex + 1);
  }

  refreshCurrentStep() {
    this.handlePath(this.currentPath);
  }

  private handlePath(path: string | null) {
    if (path === this.onboarding?.path || (path === this.summary?.path && !this.hasSkippedSomePreviousSteps())) {
      this.handleExtraPagePath(path);
      return;
    }

    const stepIndex = this.steps.findIndex((step) => path === step.path);
    if (stepIndex === -1 || this.hasSkippedSomePreviousSteps(stepIndex)) {
      this.navigateByStepIndex(this.firstStepIndex);
      return;
    }
    this.setStepByIndex(stepIndex);
  }

  private hasSkippedSomePreviousSteps(stepIndex = this.steps.length): boolean {
    const isSkipped = (control: AbstractControl) =>
      (control.hasValidator(Validators.required) || control.hasValidator(Validators.requiredTrue)) &&
      !control.value &&
      control.pristine;

    return stepIndex > 0
      ? this.steps.slice(0, stepIndex).some((step) => {
          if (step.control instanceof FormGroup) {
            return Object.values(step.control.controls).some(isSkipped);
          }
          return isSkipped(step.control);
        })
      : false;
  }

  private handleExtraPagePath(path: string) {
    if (path === this.summary?.path) {
      this.maxStepIndexViewed = this.lastStepIndex;
      this.allStepsViewed = true;
    }

    if (path === this.onboarding?.path) {
      this.stepIndex = -1;
      this._stepTemplate$.next(this.onboarding.template);
      this._state$.next({
        sectionIndex: -1,
        stepIndex: -1,
        isStepValid: true,
        hasPrevStep: false,
        hasNextStep: true,
        ...this.commonState,
      });
    } else if (path === this.summary?.path) {
      this.stepIndex = this.steps.length;
      this._stepTemplate$.next(this.summary.template);
      this._state$.next({
        sectionIndex: this.nav.length,
        stepIndex: this.steps.length,
        isStepValid: true,
        hasPrevStep: true,
        hasNextStep: false,
        ...this.commonState,
      });
    }
  }

  private setStepByIndex(stepIndex: number) {
    this.stepIndex = this.getCheckedStepIndex(stepIndex);
    this.maxStepIndexViewed = Math.max(this.maxStepIndexViewed, this.stepIndex);
    if (this.maxStepIndexViewed === this.lastStepIndex) {
      this.allStepsViewed = true;
    }

    const step = this.steps[this.stepIndex];

    this._stepTemplate$.next(step.template);

    const updateState = (isStepValid: boolean) => {
      this._state$.next({
        sectionIndex: step.sectionIndex,
        sectionProgression: step.sectionProgression,
        stepIndex: step.stepIndex,
        isStepValid,
        hasPrevStep: this.stepIndex > this.firstStepIndex,
        hasNextStep: this.stepIndex < this.lastStepIndex,
        ...this.commonState,
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

  private get commonState(): Pick<
    FormStepperState,
    'lastStepIndex' | 'maxStepIndexViewed' | 'allStepsViewed' | 'onboardingInfo' | 'summaryInfo' | 'nav'
  > {
    return {
      lastStepIndex: this.lastStepIndex,
      maxStepIndexViewed: this.maxStepIndexViewed,
      allStepsViewed: this.allStepsViewed,
      onboardingInfo: this.onboarding
        ? { title: this.onboarding.title, icon: this.onboarding.icon, index: -1 }
        : undefined,
      summaryInfo: this.summary
        ? { title: this.summary.title, icon: this.summary.icon, index: this.steps.length }
        : undefined,
      nav: [...this.nav],
    };
  }
}
