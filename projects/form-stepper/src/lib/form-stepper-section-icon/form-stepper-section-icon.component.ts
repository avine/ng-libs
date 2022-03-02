import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';

import { FormStepperService } from '../form-stepper.service';

@Component({
  selector: 'form-stepper-section-icon',
  templateUrl: './form-stepper-section-icon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormStepperSectionIconComponent {
  @Input() formStepperIcon!: TemplateRef<any>;

  @Input() formStepperIsValid!: boolean;

  formStepperValidIcon = this.service.validSectionIcon;

  constructor(private service: FormStepperService) {}
}
