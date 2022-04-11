import { Directive, HostBinding, HostListener } from '@angular/core';

import { FormStepperService } from '../form-stepper.service';

@Directive({
  selector: '[formStepperPrevAnchor]',
})
export class FormStepperPrevAnchorDirective {
  @HostBinding('class.form-stepper-prev--disabled') get isDisabled() {
    return !this.service.state.hasPrevStep;
  }

  @HostListener('click', ['$event']) onClick(event: Event) {
    event.preventDefault();
    this.service.prevStep();
  }

  constructor(private service: FormStepperService) {}
}
