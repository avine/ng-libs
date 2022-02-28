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
  @Input() formStepperStep!: AbstractControl | '';

  @Input() formStepperTitle!: string;

  @Input() formStepperPath!: string;

  constructor(public templateRef: TemplateRef<any>) {}
}
