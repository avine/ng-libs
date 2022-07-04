import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, Input, TemplateRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { FormStepperStepConfig, FormStepperStepControl } from './form-stepper-step.types';

@Directive({
  selector: '[formStepperStep]',
})
export class FormStepperStepDirective {
  /**
   * The `AbstractControl` of the step (tracks the validity state of the step).
   *
   * If the section has only one step then leave empty and the value will be inferred from `formStepperSection`.
   *
   * @example
   * ```ts
   * // When using the config object signature, `fsTitle` and `fsPath` inputs are ignored.
   * interface FormStepperStepConfig { control?: AbstractControl | string; title?: string; path: string }
   *
   * // When using the control signature, `fsTitle` and `fsPath` inputs can be used to complete the step configuration.
   * type FormStepperStepControl = string | AbstractControl
   * ```
   */
  @Input() formStepperStep!: FormStepperStepConfig | FormStepperStepControl;

  /** The value of `formStepperStep` is optional when `formGroup`, `formGroupName` or `formArrayName` is provided. */
  @Input() formGroup!: AbstractControl;

  /** The value of `formStepperStep` is optional when `formGroup`, `formGroupName` or `formArrayName` is provided. */
  @Input() formGroupName!: string;

  /** The value of `formStepperStep` is optional when `formGroup`, `formGroupName` or `formArrayName` is provided. */
  @Input() formArrayName!: string;

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

  getStep = (): AbstractControl | string => {
    const { stepConfig } = this;
    return (
      stepConfig?.control ||
      (!stepConfig && (this.formStepperStep as FormStepperStepControl)) ||
      this.formGroup ||
      this.formGroupName ||
      this.formArrayName
    );
  };

  getTitle = (): string => this.stepConfig?.title || this.fsTitle;

  getPath = (): string => this.stepConfig?.path || this.fsPath;

  getAutoNextOnValueChange = (): boolean =>
    this.stepConfig?.autoNextOnValueChange || coerceBooleanProperty(this.fsAutoNextOnValueChange);

  constructor(public template: TemplateRef<any>) {}

  private get stepConfig(): FormStepperStepConfig | void {
    if (this.formStepperStep instanceof AbstractControl || typeof this.formStepperStep === 'string') {
      return;
    }
    return this.formStepperStep;
  }
}
