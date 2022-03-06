import { ValueProvider } from '@angular/core';

import { FORM_STEPPER_CONFIG } from './form-stepper.config';
import { FormStepperConfig } from './form-stepper.types';

export const provideFormStepperConfig = (config: FormStepperConfig): ValueProvider => ({
  provide: FORM_STEPPER_CONFIG,
  useValue: config,
});
