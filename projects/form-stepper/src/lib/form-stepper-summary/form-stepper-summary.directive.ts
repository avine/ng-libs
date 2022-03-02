import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[formStepperSummary]',
})
export class FormStepperSummaryDirective {
  @Input() formStepperTitle!: string;

  @Input() formStepperIcon!: TemplateRef<any>;

  @Input() formStepperPath!: string;

  constructor(public template: TemplateRef<any>) {}
}
