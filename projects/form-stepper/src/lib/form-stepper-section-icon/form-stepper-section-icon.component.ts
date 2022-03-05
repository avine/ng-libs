import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';

import { FormStepperService } from '../form-stepper.service';

@Component({
  selector: 'form-stepper-section-icon',
  templateUrl: './form-stepper-section-icon.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [trigger('fadeIn', [transition('void => *', [style({ opacity: 0 }), animate('250ms ease-in-out')])])],
})
export class FormStepperSectionIconComponent {
  @Input() formStepperIcon!: TemplateRef<any>;

  @Input() formStepperIsValid!: boolean;

  formStepperValidIcon = this.service.validSectionIcon;

  constructor(private service: FormStepperService) {}
}
