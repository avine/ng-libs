import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[formStepperSummary]'
})
export class FormStepperSummaryDirective {
  @Input() formStepperPath!: string;

  constructor(public templateRef: TemplateRef<any>) {}
}
