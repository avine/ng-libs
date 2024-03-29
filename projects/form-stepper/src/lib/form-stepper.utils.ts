import { ValueProvider } from '@angular/core';

import { FORM_STEPPER_CONFIG, FORM_STEPPER_DEFAULT_CONFIG } from './form-stepper.config';
import { FormStepperConfig } from './form-stepper.types';

export const provideFormStepperConfig = (config: Partial<FormStepperConfig> = {}): ValueProvider => ({
  provide: FORM_STEPPER_CONFIG,
  useValue: { ...FORM_STEPPER_DEFAULT_CONFIG, ...config } as FormStepperConfig,
});

/**
 * Format "quicknav" value from array of strings to pretty HTML.
 */
export const formatQuicknavValueFromListToHtml = (list: string[], bullet = '•', startWithBreakLine = true) => {
  const breakLine = '<br />';
  const bulletWithSpace = `${bullet} `;
  return (
    (startWithBreakLine ? breakLine : '') +
    bulletWithSpace +
    list.filter((item) => item).join(breakLine + bulletWithSpace)
  );
};

let id = 0;
export const getUniqueId = () => id++;
