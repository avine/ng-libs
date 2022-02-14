import { Directive, Input, TemplateRef } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { FormStepperService } from '../form-stepper.service';

@Directive({
  selector: '[formStepperStep]',
})
export class FormStepperStepDirective {
  @Input() formStepperStep!: AbstractControl;

  @Input() title!: string;

  constructor(private service: FormStepperService, public templateRef: TemplateRef<any>) {}
}
