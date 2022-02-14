import { AfterViewInit, ChangeDetectorRef, Directive } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FORM_STEPPER_URL_PATH_PARAM } from '../form-stepper.config';
import { FormStepperService } from '../form-stepper.service';

@Directive({
  selector: '[formStepperContainer]',
  providers: [FormStepperService],
  exportAs: 'stepper',
})
export class FormStepperContainerDirective implements AfterViewInit {
  stepTemplate$ = this.service.stepTemplate$;

  isStepValid$ = this.service.isStepValid$;

  isLastStep$ = this.service.isLastStep$;

  prevStep = this.service.prevStep.bind(this.service);

  nextStep = this.service.nextStep.bind(this.service);

  constructor(
    private service: FormStepperService,
    private activatedRoute: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.service.handleUrlPath(this.activatedRoute.snapshot.paramMap.get(FORM_STEPPER_URL_PATH_PARAM));
      this.changeDetectorRef.detectChanges();
    }, 0);
  }
}
