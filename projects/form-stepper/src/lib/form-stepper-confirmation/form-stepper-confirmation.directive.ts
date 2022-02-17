import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[formStepperConfirmation]'
})
export class FormStepperConfirmationDirective {
  @Input() formStepperPath!: string;

  constructor(public templateRef: TemplateRef<any>) {}
}
