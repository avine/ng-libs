import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { NgIf, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewEncapsulation } from '@angular/core';

import { FormStepperIconComponent } from '../form-stepper-icon/form-stepper-icon.component';
import { FormStepperService } from '../form-stepper.service';
import { sectionIconAnimations } from './form-stepper-section-icon.animations';

@Component({
  standalone: true,
  imports: [NgIf, NgTemplateOutlet, FormStepperIconComponent],
  selector: 'form-stepper-section-icon',
  templateUrl: './form-stepper-section-icon.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: sectionIconAnimations,
})
export class FormStepperSectionIconComponent {
  @Input() fsIcon!: TemplateRef<any>;

  isValid = false;

  @Input() set fsIsValid(value: BooleanInput) {
    this.isValid = coerceBooleanProperty(value);
  }

  disableAnimation = false;

  @Input() set fsDisableAnimation(value: BooleanInput) {
    this.disableAnimation = coerceBooleanProperty(value);
  }

  formStepperValidIcon = this.service.validSectionIcon;

  constructor(private service: FormStepperService) {}
}
