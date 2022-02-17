import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormStepperOnboardingDirective } from '../form-stepper-onboarding/form-stepper-onboarding.directive';
import { FormStepperSubmitDirective } from '../form-stepper-submit/form-stepper-submit.directive';
import { FormStepperSummaryDirective } from '../form-stepper-summary/form-stepper-summary.directive';
import { FormStepperService } from '../form-stepper.service';

@Component({
  selector: 'form-stepper-container',
  templateUrl: './form-stepper-container.component.html',
  styleUrls: ['./form-stepper-container.component.scss'],
  providers: [FormStepperService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormStepperContainerComponent implements AfterContentInit, AfterViewInit {
  @Input() formStepperRoot!: FormGroup;

  @ContentChild(FormStepperOnboardingDirective) onboardingDirective!: FormStepperOnboardingDirective;

  @ContentChild(FormStepperSummaryDirective) summaryDirective!: FormStepperSummaryDirective;

  @ContentChild(FormStepperSubmitDirective) submitDirective!: FormStepperSubmitDirective;

  stepTemplate$ = this.service.stepTemplate$;

  state$ = this.service.state$;

  prevStep = this.service.prevStep.bind(this.service);

  nextStep = this.service.nextStep.bind(this.service);

  constructor(private service: FormStepperService) {}

  ngAfterContentInit() {
    if (this.onboardingDirective) {
      const { formStepperTitle: title, formStepperPath: path, templateRef } = this.onboardingDirective;
      this.service.onboarding = { title, path, templateRef };
    }
    if (this.summaryDirective) {
      const { formStepperTitle: title, formStepperPath: path, templateRef } = this.summaryDirective;
      this.service.summary = { title, path, templateRef };
    }
  }

  ngAfterViewInit() {
    setTimeout(() => this.service.init(), 0);
  }
}
