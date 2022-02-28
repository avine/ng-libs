import { TemplateRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';

export interface FormStepperState {
  sectionIndex: number;
  sectionProgression?: FormStepperSectionProgression;
  stepIndex: number;
  isStepValid: boolean;
  hasPrevStep: boolean;
  hasNextStep: boolean;
  lastStepIndex: number;
  maxStepIndexViewed: number;
  allStepsViewed: boolean;
  onboardingInfo?: FormStepperExtraPageInfo;
  summaryInfo?: FormStepperExtraPageInfo;
  nav: FormStepperNavSection[];
}

export interface FormStepperNavSection {
  title: string;
  control: AbstractControl;
  stepIndexOffset: number;
  steps: FormStepperStep[];
  hasQuicknav: boolean;
}

export interface FormStepperStep {
  title: string;
  path: string;
  control: AbstractControl;
  templateRef: TemplateRef<any>;
  sectionIndex: number;
  sectionProgression?: FormStepperSectionProgression;
  stepIndex: number;
}

export interface FormStepperSectionProgression {
  count: number;
  total: number;
}

export interface FormStepperExtraPageInfo {
  title: string;
  index: number;
}

export interface FormStepperExtraPage {
  title: string;
  path: string;
  templateRef: TemplateRef<any>;
}
