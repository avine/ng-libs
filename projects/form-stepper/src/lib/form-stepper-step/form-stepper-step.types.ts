import { AbstractControl } from '@angular/forms';

export interface FormStepperStepConfig {
  control?: FormStepperStepControl;
  title?: string;
  autoNextOnValueChange?: boolean;
  path: string;
}

export type FormStepperStepControl = AbstractControl | string;
