import { Directive, HostBinding, HostListener } from '@angular/core';

import { FormStepperService } from '../form-stepper.service';

@Directive({
  selector: '[formStepperNext]'
})
export class FormStepperNextDirective {
  @HostBinding('disabled') get isDisabled() {
    return !this.service.state.hasNextStep || !this.service.state.isStepValid;
  }

  @HostListener('click') onClick() {
    this.service.nextStep();
  }

  constructor(private service: FormStepperService) { }
}
