import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[formStepperSubmit]'
})
export class FormStepperSubmitDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}
