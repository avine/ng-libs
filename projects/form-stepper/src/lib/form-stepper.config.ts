import { InjectionToken } from '@angular/core';

import { FormStepperConfig } from './form-stepper.types';

export const FORM_STEPPER_DEFAULT_CONFIG: FormStepperConfig = {
  translations: {
    prev: 'Previous',
    next: 'Next',
    submit: 'Submit',
    yes: 'Yes',
    no: 'No',
  },
  css: {
    sectionTitle: '',
    prev: '',
    next: '',
    submit: '',
  },
  breakpoint: '1023px',
};

export const FORM_STEPPER_CONFIG = new InjectionToken<FormStepperConfig>('formStepperConfig');

export const FORM_STEPPER_PATH_PARAM = 'formStepperPathParam';
