import { Directive, Input, TemplateRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Directive({
  selector: '[formStepperStep]',
})
export class FormStepperStepDirective {
  @Input() formStepperStep!: AbstractControl;

  @Input() title!: string;

  constructor(public templateRef: TemplateRef<any>) {}
}
