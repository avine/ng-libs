import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormStepperService } from './form-stepper.service';

@Component({
  selector: 'form-stepper',
  templateUrl: 'form-stepper.component.html',
  styleUrls: ['form-stepper.component.scss'],
  providers: [FormStepperService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormStepperComponent implements AfterViewInit {
  @Input() set formStepperFormGroup(formGroup: FormGroup) {
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
      //this.service.emitNav();
      this.changeDetectorRef.detectChanges();
    }, 0);
  }
}
