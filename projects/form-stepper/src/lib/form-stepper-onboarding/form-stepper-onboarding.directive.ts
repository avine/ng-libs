import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[formStepperOnboarding]'
})
export class FormStepperOnboardingDirective {
  @Input() urlPath!: string;

  constructor(public templateRef: TemplateRef<any>) {}
}
