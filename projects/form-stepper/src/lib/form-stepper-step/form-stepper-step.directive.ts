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

  /** The value of `formStepperStep` is optional when `formGroup` or `formGroupName` is provided */
  @Input() formGroup!: AbstractControl;

  /** The value of `formStepperStep` is optional when `formGroup` or `formGroupName` is provided */
  @Input() formGroupName!: string;

  @Input() formStepperTitle!: string;

  @Input() formStepperPath!: string;

  getStep = (): AbstractControl | string => this.formStepperStep || this.formGroup || this.formGroupName;

  constructor(public template: TemplateRef<any>) {}
}
