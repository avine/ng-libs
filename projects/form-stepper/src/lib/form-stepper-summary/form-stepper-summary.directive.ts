import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[formStepperSummary]'
})
export class FormStepperSummaryDirective {
  @Input() urlPath!: string;

  constructor(public templateRef: TemplateRef<any>) {}
}
