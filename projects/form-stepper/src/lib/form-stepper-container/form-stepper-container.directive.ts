import { AfterViewInit, ChangeDetectorRef, Directive, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormStepperService } from '../form-stepper.service';

@Directive({
  selector: '[formStepperContainer]',
  exportAs: 'stepper',
  providers: [FormStepperService],
})
export class FormStepperContainerDirective implements AfterViewInit {
  @Input() set formStepperContainer(formGroup: FormGroup) {
    this.service.setFormGroup(formGroup);
  }

  currentStep$ = this.service.currentStep$;

  prevStep = this.service.prevStep.bind(this.service);

  nextStep = this.service.nextStep.bind(this.service);

  isCurrentStepValid$ = this.service.isCurrentStepValid$;

  constructor(private service: FormStepperService, private changeDetectorRef: ChangeDetectorRef) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.service.setStep(0);
      // this.service.emitNav();
      this.changeDetectorRef.detectChanges();
    }, 0);
  }
}
