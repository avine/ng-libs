import { Directive, HostBinding, HostListener } from '@angular/core';

import { FormStepperService } from '../form-stepper.service';

@Directive({
  selector: '[formStepperPrev]',
})
export class FormStepperPrevDirective {
  @HostBinding('disabled') get isDisabled() {
    return !this.service.state.hasPrevStep;
  }

  @HostListener('click') onClick() {
    this.service.prevStep();
  }

  constructor(private service: FormStepperService) {}
}
