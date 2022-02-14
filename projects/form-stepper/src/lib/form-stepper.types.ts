import { TemplateRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';

export interface FormStepperStep {
  control: AbstractControl;
  templateRef: TemplateRef<any>;
  title: string;
}
