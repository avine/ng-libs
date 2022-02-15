import { TemplateRef } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

export interface FormStepperStep {
  title: string;
  urlPath: string;
  control: AbstractControl;
  templateRef: TemplateRef<any>;
  sectionIndex: number;
  stepIndex: number;
  sectionProgression: FormStepperSectionProgression;
}

export interface FormStepperState {
  currentSectionIndex: number;
  currentStepIndex: number;
  isCurrentStepValid: boolean;
  hasPrevStep: boolean;
  hasNextStep: boolean;
  maxStepIndexViewed: number;
  hasReachedEnd: boolean;
  sectionProgression: FormStepperSectionProgression;
  nav: FormStepperNavSection[];
}

export interface FormStepperSectionProgression {
  count: number;
  total: number;
}

export interface FormStepperNavSection {
  title: string;
  section: FormGroup;
  offset: number;
  steps: FormStepperStep[];
}
