import { Directive, TemplateRef } from '@angular/core';

import { FormStepperService } from '../form-stepper.service';

@Directive({
  selector: '[formStepperMain]',
  exportAs: 'formStepperMain',
})
export class FormStepperMainDirective {
  main$ = this.service.main$;

  constructor(public template: TemplateRef<any>, private service: FormStepperService) {}
}
