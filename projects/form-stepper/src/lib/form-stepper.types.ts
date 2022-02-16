import { TemplateRef } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

export interface FormStepperStep {
  title: string;
  path: string;
  control: AbstractControl;
  templateRef: TemplateRef<any>;
  sectionIndex: number;
  stepIndex: number;
  sectionProgression?: FormStepperSectionProgression;
}

export interface FormStepperState {
  sectionIndex: number;
  stepIndex: number;
  sectionProgression?: FormStepperSectionProgression;
  isStepValid: boolean;
  hasPrevStep: boolean;
  hasNextStep: boolean;
  maxStepIndexViewed: number;
  hasReachedEnd: boolean;
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

export interface FormStepperExtraPage {
  path: string;
  templateRef: TemplateRef<any>;
}
