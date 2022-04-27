import { TemplateRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';

export interface FormStepperSectionConfig {
  control?: FormStepperSectionControl;
  title?: string;
  icon?: TemplateRef<any>;
}

export type FormStepperSectionControl = AbstractControl | string;
