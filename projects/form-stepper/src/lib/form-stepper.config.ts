import { InjectionToken } from '@angular/core';

import { FormStepperConfig } from './form-stepper.types';

export const FORM_STEPPER_DEFAULT_CONFIG: FormStepperConfig = {
  translations: {
    start: 'Start',
    prev: 'Previous',
    next: 'Next',
    submit: 'Submit',
    yes: 'Yes',
    no: 'No',
  },
  css: {
    stepTitle: '',
    prev: '',
    next: '',
    submit: '',
  },
  breakpoint: '1024px',
};

export const FORM_STEPPER_CONFIG = new InjectionToken<FormStepperConfig>('formStepperConfig');

export const FORM_STEPPER_PATH_PARAM = 'formStepperPathParam';
