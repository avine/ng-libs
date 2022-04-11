import { ValueProvider } from '@angular/core';

import { FORM_STEPPER_CONFIG, FORM_STEPPER_DEFAULT_CONFIG } from './form-stepper.config';
import { FormStepperConfig } from './form-stepper.types';

export const provideFormStepperConfig = (config: Partial<FormStepperConfig> = {}): ValueProvider => ({
  provide: FORM_STEPPER_CONFIG,
  useValue: { ...FORM_STEPPER_DEFAULT_CONFIG, ...config } as FormStepperConfig,
});
