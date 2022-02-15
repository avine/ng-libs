import { AfterViewInit, Directive } from '@angular/core';

import { FormStepperService } from '../form-stepper.service';

@Directive({
  selector: '[formStepperContainer]',
  providers: [FormStepperService],
  exportAs: 'stepper',
})
export class FormStepperContainerDirective implements AfterViewInit {
  stepTemplate$ = this.service.stepTemplate$;

  state$ = this.service.state$;

  prevStep = this.service.prevStep.bind(this.service);

  nextStep = this.service.nextStep.bind(this.service);

  constructor(private service: FormStepperService) {}

  ngAfterViewInit() {
    setTimeout(() => this.service.init(), 0);
  }
}
