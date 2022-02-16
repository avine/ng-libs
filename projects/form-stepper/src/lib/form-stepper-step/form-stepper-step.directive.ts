import { Directive, Input, TemplateRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Directive({
  selector: '[formStepperStep]',
})
export class FormStepperStepDirective {
  @Input() formStepperStep!: AbstractControl;

  @Input() formStepperTitle!: string;

  @Input() formStepperPath!: string;

  constructor(public templateRef: TemplateRef<any>) {}
}
