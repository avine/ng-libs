import { AbstractControl } from '@angular/forms';

export interface FormStepperStepConfig {
  control?: FormStepperStepControl;
  title?: string;
  path: string;
}

export type FormStepperStepControl = AbstractControl | string;
