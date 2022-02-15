import { TemplateRef } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

export interface FormStepperStep {
  title: string;
  urlPath: string;
  control: AbstractControl;
  templateRef: TemplateRef<any>;
}

export interface FormStepperNavSection {
  title: string;
  section: FormGroup;
  offset: number;
  steps: FormStepperStep[];
}

export interface FormStepperState {
  isCurrentStepValid: boolean;
  hasPrevStep: boolean;
  hasNextStep: boolean;
  maxStepIndexViewed: number;
  hasReachedEnd: boolean;
  nav: FormStepperNavSection[];
}
