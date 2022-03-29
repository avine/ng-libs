import { Directive, Input, TemplateRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Directive({
  selector: '[formStepperStep]',
})
export class FormStepperStepDirective {
  /**
   * The `AbstractControl` of the step.
   * If there's only one step in the section then leave empty and
   * the `AbstractControl` of the `formStepperSection` will be used.
   */
  @Input() formStepperStep!: AbstractControl | string;

  /** The value of `formStepperStep` is optional when `formGroup`, `formGroupName` or `formArrayName` is provided */
  @Input() formGroup!: AbstractControl;

  /** The value of `formStepperStep` is optional when `formGroup`, `formGroupName` or `formArrayName` is provided */
  @Input() formGroupName!: string;

  /** The value of `formStepperStep` is optional when `formGroup`, `formGroupName` or `formArrayName` is provided */
  @Input() formArrayName!: string;

  @Input() formStepperTitle!: string;

  @Input() formStepperPath!: string;

  getStep = (): AbstractControl | string =>
    this.formStepperStep || this.formGroup || this.formGroupName || this.formArrayName;

  constructor(public template: TemplateRef<any>) {}
}
