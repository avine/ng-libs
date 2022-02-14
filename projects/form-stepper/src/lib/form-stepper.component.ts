import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Input,
  QueryList,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormStepperSectionDirective } from './form-stepper-section/form-stepper-section.directive';
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

  @ContentChildren(FormStepperSectionDirective)
  private sectionDirectiveQueryList!: QueryList<FormStepperSectionDirective>;

  currentStep$ = this.service.currentStep$;

  prevStep = this.service.prevStep.bind(this.service);

  nextStep = this.service.nextStep.bind(this.service);

  isCurrentStepValid$ = this.service.isCurrentStepValid$;

  constructor(private service: FormStepperService, private changeDetectorRef: ChangeDetectorRef) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.service.setStep(0);
      this.service.emitNav();
      this.changeDetectorRef.detectChanges();
    }, 0);
  }
}
