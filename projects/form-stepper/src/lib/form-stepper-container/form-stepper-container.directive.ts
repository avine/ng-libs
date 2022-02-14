import { AfterViewInit, ChangeDetectorRef, Directive } from '@angular/core';

import { FormStepperService } from '../form-stepper.service';

@Directive({
  selector: '[formStepperContainer]',
  exportAs: 'stepper',
  providers: [FormStepperService],
})
export class FormStepperContainerDirective implements AfterViewInit {
  stepTemplate$ = this.service.stepTemplate$;

  isStepValid$ = this.service.isStepValid$;

  prevStep = this.service.prevStep.bind(this.service);

  nextStep = this.service.nextStep.bind(this.service);

  constructor(private service: FormStepperService, private changeDetectorRef: ChangeDetectorRef) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.service.setStepIndex(0);
      this.changeDetectorRef.detectChanges();
    }, 0);
  }
}
