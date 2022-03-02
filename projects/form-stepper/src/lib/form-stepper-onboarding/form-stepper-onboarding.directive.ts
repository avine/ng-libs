import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[formStepperOnboarding]',
})
export class FormStepperOnboardingDirective {
  @Input() formStepperTitle!: string;

  @Input() formStepperIcon!: TemplateRef<any>;

  @Input() formStepperPath!: string;

  constructor(public template: TemplateRef<any>) {}
}
