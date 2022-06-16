import { BooleanInput } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewEncapsulation } from '@angular/core';

import { FormStepperService } from '../form-stepper.service';
import { sectionIconAnimations } from './form-stepper-section-icon.animations';

@Component({
  selector: 'form-stepper-section-icon',
  templateUrl: './form-stepper-section-icon.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: sectionIconAnimations,
})
export class FormStepperSectionIconComponent {
  @Input() formStepperIcon!: TemplateRef<any>;

  isValid: BooleanInput = false;

  @Input() set formStepperIsValid(value: BooleanInput) {
    this.isValid = value;
  }

  disableAnimation: BooleanInput = false;

  @Input() set formStepperDisableAnimation(value: BooleanInput) {
    this.disableAnimation = value;
  }

  formStepperValidIcon = this.service.validSectionIcon;

  constructor(private service: FormStepperService) {}
}
