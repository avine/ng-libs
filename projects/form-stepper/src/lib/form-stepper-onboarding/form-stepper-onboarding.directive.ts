import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[formStepperOnboarding]',
})
export class FormStepperOnboardingDirective {
  @Input() formStepperTitle!: string;

  @Input() formStepperPath!: string;

  constructor(public templateRef: TemplateRef<any>) {}
}
