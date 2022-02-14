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
