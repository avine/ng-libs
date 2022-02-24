import { InjectionToken, ValueProvider } from '@angular/core';

export interface FormStepperTranslations {
  prev: string;
  next: string;
  submit: string;
  yes: string;
  no: string;
}

export const FORM_STEPPER_DEFAULT_TRANSLATIONS: FormStepperTranslations = {
  prev: 'Previous',
  next: 'Next',
  submit: 'Submit',
  yes: 'Yes',
  no: 'No',
};

export const FORM_STEPPER_TRANSLATIONS = new InjectionToken<FormStepperTranslations>('formStepperTranslations');

export const provideFormStepperTranslations = (translations: FormStepperTranslations): ValueProvider => ({
  provide: FORM_STEPPER_TRANSLATIONS,
  useValue: translations,
});
