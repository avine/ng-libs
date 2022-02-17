import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Input,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormStepperConfirmationDirective } from '../form-stepper-confirmation/form-stepper-confirmation.directive';
import { FormStepperOnboardingDirective } from '../form-stepper-onboarding/form-stepper-onboarding.directive';
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

  @ContentChild(FormStepperConfirmationDirective) confirmationDirective!: FormStepperConfirmationDirective;

  stepTemplate$ = this.service.stepTemplate$;

  state$ = this.service.state$;

  prevStep = this.service.prevStep.bind(this.service);

  nextStep = this.service.nextStep.bind(this.service);

  constructor(private service: FormStepperService) {}

  ngAfterContentInit() {
    if (this.onboardingDirective) {
      const { formStepperPath: path, templateRef } = this.onboardingDirective;
      this.service.onboarding = { path, templateRef };
    }
    if (this.confirmationDirective) {
      const { formStepperPath: path, templateRef } = this.confirmationDirective;
      this.service.confirmation = { path, templateRef };
    }
  }

  ngAfterViewInit() {
    setTimeout(() => this.service.init(), 0);
  }
}
