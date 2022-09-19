import { TemplateRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';

export interface FormStepperState {
  sectionIndex: number;
  sectionProgression?: FormStepperSectionProgression;
  stepIndex: number;
  isStepValid: boolean;
  hasPrevStep: boolean;
  hasNextStep: boolean;
  firstStepIndex: number;
  lastStepIndex: number;
  maxStepIndexViewed: number;
  allStepsViewed: boolean;
  onboardingInfo?: FormStepperExtraPageInfo;
  summaryInfo?: FormStepperExtraPageInfo;
  nav: FormStepperNavSection[];
}

export interface FormStepperNavSection {
  id: number;
  title: string;
  icon: TemplateRef<any>;
  control: AbstractControl;
  stepIndexOffset: number;
  steps: FormStepperStep[];
  hasQuicknav: boolean;
}

export interface FormStepperStep {
  id: number;
  title: string;
  path: string;
  autoNextOnValueChange: boolean;
  control: AbstractControl;
  template: TemplateRef<any>;
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
  icon: TemplateRef<any>;
  index: number;
}

export interface FormStepperExtraPage {
  title: string;
  icon: TemplateRef<any>;
  path: string;
  template: TemplateRef<any>;
}

export interface FormStepperMain {
  sectionTitle: string;
  stepTitle: string;
  stepTemplate: TemplateRef<any>;
  isStepValid: boolean;
  isFirstStep: boolean;
  isLastStep: boolean;
  isOnboarding: boolean;
  isSummary: boolean;
  progressionInPercent: number;
}

export interface FormStepperConfig {
  breakpoint: string;
}
