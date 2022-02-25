import { TemplateRef } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

export interface FormStepperStep {
  title: string;
  path: string;
  control: AbstractControl;
  templateRef: TemplateRef<any>;
  sectionIndex: number;
  sectionProgression?: FormStepperSectionProgression;
  stepIndex: number;
}

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

export interface FormStepperSectionProgression {
  count: number;
  total: number;
}

export interface FormStepperExtraPage {
  title: string;
  path: string;
  templateRef: TemplateRef<any>;
}

export interface FormStepperExtraPageInfo {
  title: string;
  index: number;
}

export interface FormStepperNavSection {
  title: string;
  control: FormGroup;
  stepIndexOffset: number;
  steps: FormStepperStep[];
  hasQuicknav: boolean;
}
