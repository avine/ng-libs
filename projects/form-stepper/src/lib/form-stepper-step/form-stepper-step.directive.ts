import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, Input, TemplateRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { FormStepperStepOptions } from './form-stepper-step.types';

@Directive({
  selector: '[formStepperStep]',
})
export class FormStepperStepDirective {
  /**
   * The `AbstractControl` of the step (tracks the validity state of the step).
   *
   * If the section has only one step then leave empty and the value will be inferred from `formStepperSection`.
   */
  @Input() formStepperStep!: AbstractControl | string;

  /** The value of `formStepperStep` is optional when `formGroup`, `formGroupName` or `formArrayName` is provided. */
  @Input() formGroup!: AbstractControl;

  /** The value of `formStepperStep` is optional when `formGroup`, `formGroupName` or `formArrayName` is provided. */
  @Input() formGroupName!: string;

  /** The value of `formStepperStep` is optional when `formGroup`, `formGroupName` or `formArrayName` is provided. */
  @Input() formArrayName!: string;

  /**
   * Configure step options
   *
   * When defined, `fsTitle`, `fsPath` and `fsAutoNextOnValueChange` inputs are ignored.
   */
  @Input() fsOptions!: FormStepperStepOptions;

  /**
   * The title of the step.
   *
   * If the section has only one step then leave empty and the value will be inferred from the title of `formStepperSection`.
   */
  @Input() fsTitle!: string;

  /**
   * The route parameter to use to navigate to the step (ie: the value of `FORM_STEPPER_PATH_PARAM`).
   *
   * This input is required.
   */
  @Input() fsPath!: string;

  /**
   * Determines whether to go to the next step each time value changes (and the current step is valid).
   * This is useful when for example the step only contains radio buttons choice.
   */
  @Input() fsAutoNextOnValueChange: BooleanInput = false;

  getStep = (): AbstractControl | string =>
    this.formStepperStep || this.formGroup || this.formGroupName || this.formArrayName;

  getTitle = (): string => this.fsOptions?.title || this.fsTitle;

  getPath = (): string => this.fsOptions?.path || this.fsPath;

  getAutoNextOnValueChange = (): boolean =>
    this.fsOptions?.autoNextOnValueChange || coerceBooleanProperty(this.fsAutoNextOnValueChange);

  constructor(public template: TemplateRef<any>) {}
}
