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
  icon: TemplateRef<any>;
  control: AbstractControl;
  stepIndexOffset: number;
  steps: FormStepperStep[];
  hasQuicknav: boolean;
}

export interface FormStepperStep {
  title: string;
  path: string;
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
  stepTemplate: TemplateRef<any>;
  isLastStep: boolean;
}

export interface FormStepperConfig {
  translations: {
    prev: string;
    next: string;
    submit: string;
    yes: string;
    no: string;
  };
  css: {
    sectionTitle: string;
    prev: string;
    next: string;
    submit: string;
  };
  breakpoint: string;
}
