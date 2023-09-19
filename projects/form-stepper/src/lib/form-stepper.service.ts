import { BehaviorSubject, combineLatest, Observable, ReplaySubject, Subscription } from 'rxjs';
import { distinctUntilChanged, map, tap } from 'rxjs/operators';

import { DOCUMENT, Location } from '@angular/common';
import { ChangeDetectorRef, Inject, Injectable, OnDestroy, TemplateRef } from '@angular/core';
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
  useRouting = true;

  scrollToTopElementOnNavigation?: HTMLElement;

  formGroupRoot!: FormGroup;

  validSectionIcon!: TemplateRef<any>;

  onboarding!: FormStepperExtraPage;

  summary!: FormStepperExtraPage;

  private nav: FormStepperNavSection[] = [];

  private steps: FormStepperStep[] = [];

  private stepIndex!: number;

  private maxStepIndexViewed = -1;

  private allStepsViewed = false;

  private get firstStepIndex() {
    return this.onboarding ? -1 : 0;
  }

  private get lastStepIndex() {
    return this.steps.length + (this.summary ? 0 : -1);
  }

  private _stepTemplate$ = new ReplaySubject<TemplateRef<any>>(1);

  stepTemplate$ = this._stepTemplate$.asObservable();

  private _state$ = new BehaviorSubject<FormStepperState>({
    sectionIndex: 0,
    stepIndex: 0,
    isStepValid: false,
    hasPrevStep: false,
    hasNextStep: false,
    firstStepIndex: 0,
    lastStepIndex: 0,
    maxStepIndexViewed: -1,
    allStepsViewed: false,
    nav: [],
  });

  state$ = this._state$.asObservable();

  get state() {
    return this._state$.value;
  }

  private get currentTitles(): { sectionTitle: string; stepTitle: string } {
    const state = this.state;
    if (state.stepIndex === state.onboardingInfo?.index) {
      const title = state.onboardingInfo?.title;
      return { sectionTitle: title, stepTitle: title };
    }
    if (state.stepIndex === state.summaryInfo?.index) {
      const title = state.summaryInfo?.title;
      return { sectionTitle: title, stepTitle: title };
    }
    return {
      sectionTitle: state.nav[state.sectionIndex]?.title,
      stepTitle: this.steps[state.stepIndex]?.title,
    };
  }

  main$: Observable<FormStepperMain> = combineLatest([this.stepTemplate$, this.state$]).pipe(
    map(([stepTemplate, state]) => {
      const { sectionTitle, stepTitle } = this.currentTitles;
      const { isStepValid, stepIndex, firstStepIndex, lastStepIndex, onboardingInfo, summaryInfo } = state;
      return {
        sectionTitle,
        stepTitle,
        stepTemplate,
        isStepValid,
        isFirstStep: stepIndex === firstStepIndex,
        isLastStep: stepIndex === lastStepIndex,
        isOnboarding: stepIndex === onboardingInfo?.index,
        isSummary: stepIndex === summaryInfo?.index,
        progressionInPercent: Math.round(
          100 - ((lastStepIndex - stepIndex) / (lastStepIndex + (onboardingInfo ? 1 : 0))) * 100,
        ),
      };
    }),
    tap((main) => (this.mainSnapshot = main)),
  );

  mainSnapshot!: FormStepperMain;

  private path: string | null = null;

  private pathSubscription!: Subscription;

  private currentStepElements = new Set<HTMLElement>();

  private get currentStepHasNoValue(): boolean {
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

  private currentStepStatusSubscription!: Subscription;

  private currentStepValueSubscription!: Subscription;

  constructor(
    @Inject(FORM_STEPPER_CONFIG) public readonly config: FormStepperConfig,
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnDestroy() {
    this.pathSubscription?.unsubscribe();
    this.currentStepStatusSubscription?.unsubscribe();
    this.currentStepValueSubscription?.unsubscribe();
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

  // ----- Build -----

  getNewIndexes() {
    return { sectionIndex: this.nav.length, stepIndexOffset: this.steps.length };
  }

  findExistingIndexes(sectionId: number) {
    const sectionIndex = this.nav.findIndex(({ id }) => id === sectionId);
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
    this.currentStepElements.add(element);

    if (this.currentStepElements.size === 1 && this.currentStepHasNoValue) {
      this.focusControlElement(element);
    }
  }

  private focusControlElement(element: HTMLElement) {
    const isHtmlFieldElement = [HTMLInputElement, HTMLSelectElement, HTMLTextAreaElement].some(
      (htmlFieldElement) => element instanceof htmlFieldElement,
    );

    if (isHtmlFieldElement) {
      element.focus();
    } else if (this.document.defaultView?.CustomEvent) {
      // Let's give a change to the element to react to the `focus` event.
      element.dispatchEvent(new this.document.defaultView.CustomEvent('focus'));
    }
  }

  removeControlElement(element: HTMLElement) {
    this.currentStepElements.delete(element);
  }

  updateSectionTitle(sectionId: number, title: string) {
    const sectionIndex = this.nav.findIndex(({ id }) => id === sectionId);
    if (sectionIndex === -1) {
      return;
    }
    this.nav[sectionIndex].title = title;

    // In case the section contains only one step, the step title is supposed to be inferred from the section title.
    if (this.nav[sectionIndex].steps.length === 1) {
      this.nav[sectionIndex].steps[0].title = title;
    }

    this._state$.next(this.state);
  }

  updateStepTitle(stepId: number, title: string) {
    const stepIndex = this.steps.findIndex(({ id }) => id === stepId);
    if (stepIndex === -1) {
      return;
    }
    this.steps[stepIndex].title = title;
    this._state$.next(this.state);
  }

  // ----- Navigate -----

  init() {
    if (this.useRouting) {
      this.initWithRouting();
    } else {
      this.handlePath(this.findPathFromStepIndex(this.firstStepIndex));
    }
  }

  refreshCurrentStep() {
    this.handlePath(this.path);
  }

  navigateByStepIndex(stepIndex: number, replaceUrl = false) {
    if (this.useRouting) {
      this.navigateByStepIndexWithRouting(stepIndex, replaceUrl);
    } else {
      this.handlePath(this.findPathFromStepIndex(stepIndex));
    }
  }

  prevStep() {
    this.navigateByStepIndex(this.stepIndex - 1);
  }

  nextStep() {
    this.navigateByStepIndex(this.stepIndex + 1);
  }

  private initWithRouting() {
    this.pathSubscription = this.activatedRoute.paramMap
      .pipe(map((paramMap) => paramMap.get(FORM_STEPPER_PATH_PARAM)))
      .subscribe((path) => {
        if (!this.steps.length) {
          return;
        }
        this.handlePath(path);
      });
  }

  private handlePath(path: string | null) {
    this.scrollToTop();

    this.path = path;

    if (path === this.onboarding?.path) {
      return this.handleExtraPagePath(path);
    }

    if (path === this.summary?.path) {
      this.handleSkippedStep() || this.handleExtraPagePath(path);
      return;
    }

    const stepIndex = this.steps.findIndex((step) => path === step.path);
    if (stepIndex === -1) {
      return this.navigateByStepIndex(this.firstStepIndex, true);
    }

    this.handleSkippedStep(stepIndex) || this.setStepByIndex(stepIndex);
  }

  private scrollToTop(): void {
    this.scrollToTopElementOnNavigation?.scrollIntoView(true);
  }

  private navigateByStepIndexWithRouting(stepIndex: number, replaceUrl = false) {
    if (!this.path || !this.router.url.match(`/${this.path}`)) {
      // Back to homepage when unable to identify the current path
      this.router.navigate(['/']);
      return;
    }
    const nextPath = this.findPathFromStepIndex(stepIndex);
    this.router.navigateByUrl(this.router.url.replace(`/${this.path}`, `/${nextPath}`), { replaceUrl });
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

  private handleSkippedStep(stepIndex = this.steps.length): boolean {
    if (stepIndex <= 0) {
      return false;
    }

    // `0` and `false` are considered to be a value (unlike empty-string which is not)
    const hasNoValue = (value: any) => !(value || [0, false].includes(value));

    const isSkipped = (control: AbstractControl) =>
      (control.hasValidator(Validators.required) || control.hasValidator(Validators.requiredTrue)) &&
      hasNoValue(control.value) &&
      control.pristine;

    const skippedStepIndex = this.steps.slice(0, stepIndex).findIndex(({ control }) => {
      if (control instanceof FormGroup) {
        return Object.values(control.controls).some(isSkipped);
      }
      if (control instanceof FormArray) {
        return control.controls.some(isSkipped);
      }
      return isSkipped(control as FormControl);
    });

    if (skippedStepIndex === -1) {
      return false;
    }

    this.maxStepIndexViewed = skippedStepIndex;
    this.allStepsViewed = false;
    this.navigateByStepIndex(skippedStepIndex);
    return true;
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

    this.currentStepStatusSubscription?.unsubscribe();
    this.currentStepStatusSubscription = step.control.statusChanges
      .pipe(
        distinctUntilChanged(),
        map((status) => status === 'VALID'),
      )
      .subscribe(updateState);

    this.currentStepValueSubscription?.unsubscribe();
    if (step.autoNextOnValueChange) {
      this.currentStepValueSubscription = step.control.valueChanges.subscribe(() => {
        if (step.control.invalid) {
          return;
        }
        // Changing the value may have a side effect on the overall stepper structure (adding/removing sections/steps).
        // We have to wait for these changes to take effect.
        setTimeout(() => {
          this.nextStep();
          this.changeDetectorRef.detectChanges();
        });
      });
    }
  }

  private getCheckedStepIndex(stepIndex: number): number {
    return Math.min(Math.max(this.firstStepIndex, stepIndex), this.lastStepIndex);
  }

  private get commonState(): Pick<
    FormStepperState,
    | 'firstStepIndex'
    | 'lastStepIndex'
    | 'maxStepIndexViewed'
    | 'allStepsViewed'
    | 'onboardingInfo'
    | 'summaryInfo'
    | 'nav'
  > {
    return {
      firstStepIndex: this.firstStepIndex,
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
