import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  HostBinding,
  Input,
  ViewEncapsulation,
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
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormStepperContainerComponent implements AfterContentInit, AfterViewInit {
  @HostBinding('class.form-stepper-container') hasClass = true;

  @Input() formStepperRoot!: FormGroup;

  @ContentChild(FormStepperSubmitDirective) submitDirective!: FormStepperSubmitDirective;

  @ContentChild(FormStepperOnboardingDirective) onboardingDirective!: FormStepperOnboardingDirective;

  @ContentChild(FormStepperSummaryDirective) summaryDirective!: FormStepperSummaryDirective;

  state$ = this.service.state$;

  translations = this.service.translations;

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
